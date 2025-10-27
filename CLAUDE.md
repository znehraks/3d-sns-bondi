# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a 3D social networking platform (3D SNS) built with React, Three.js, and TypeScript. Users can explore a shared 3D world (GROUND), customize their personal rooms (MY_ROOM), interact with NPCs, complete quests, and play mini-games. Real-time multiplayer is powered by Socket.io.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production (runs TypeScript compiler + Vite build)
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview
```

## Architecture Overview

### State Management (Recoil)

All global state is centralized in `src/store/PlayersAtom.ts`:
- **Players**: `PlayersAtom` (all players), `MeAtom` (current user)
- **Maps**: `CurrentMapAtom` supports three map types: "GROUND", "MY_ROOM", "MINI_GAME"
- **Chat**: `ChatsAtom` (all messages), `RecentChatsAtom` (for speech bubbles)
- **Room System**: `CurrentMyRoomPlayerAtom`, `CurrentPlacingMyRoomFurnitureAtom`, `CurrentPlacingMyRoomMemoAtom`
- **Quests/Inventory**: `PlayerCompletedQuestsAtom`, `PlayerInventoryAtom`
- **Mini-game**: `IsMiniGameStartedAtom`, `BulletCountAtom`, `HitCountAtom`

### Real-time Communication

Socket.io client connects to Heroku backend:
- Socket instance exported from `src/sockets/clientSocket.ts`
- Backend URL: `https://threejs-lecture-socket-backend-f2b9563a2109.herokuapp.com/`
- Local development: uncomment `localhost:4000` in `clientSocket.ts`

### 3D Rendering Architecture

**MainCanvas** (`src/components/content/canvas/MainCanvas.tsx`):
- React Three Fiber `<Canvas>` with custom camera setup
- `<Physics>` wrapper from `@react-three/cannon` for collision detection
- Renders `<RootMap>` which switches between map types based on `CurrentMapAtom`

**Player System** (`src/components/content/canvas/maps/player/`):
- `usePlayer` hook handles:
  - Character movement interpolation (position lerping)
  - Animation state management (Idle/Run)
  - Camera following (isometric view at +12, +12, +12 offset)
  - Collision detection with structures
  - Nickname/chat bubble positioning
- Character models: CubeGuyCharacter, CubeWomanCharacter, Steve
- Uses `SkeletonUtils.clone()` for instancing animated characters

**Maps Structure**:
1. **GROUND** (`src/components/content/canvas/maps/structures/ground/`):
   - Public shared world with playground structures (Swing, Slide, JungleGym)
   - NPCs: Zombie (coding quest), ShibaInu (fetch quest), Dinosaur
   - Interactive objects: Key, Steak, WoodChest
   - Collision system: `PlayGroundStructuresBoundingBoxAtom` stores bounding boxes
   - 3D UI elements: ChatBubble, Textboard

2. **MY_ROOM** (`src/components/content/canvas/maps/structures/myRoom/`):
   - Personal customizable space with walls and floor
   - Furniture placement system with three modes:
     - **Place Mode**: `MyRoomFurniturePlaceMode`, `MyRoomMemoPlaceMode`, `MyRoomSkillPlaceMode`
     - **Rotation Mode**: `MyRoomFurnitureRotationMode`
     - **View Mode**: Default mode for viewing placed objects
   - Objects stored in player's `myRoom.objects` array with position/rotation

3. **MINI_GAME** (shooting game):
   - First-person shooter mechanics
   - Bullet count and hit tracking
   - UI: Crosshair, MiniGameUI

### UI Layer Structure

2D UI overlays in `src/components/content/canvasLayout/canvasUserInterfaces/`:
- **common/**: Footer, SideBar, Notice (player join/leave), ChatArea
- **ground/**: ObjectInteraction (shows nearby object names), Popup, Minimap
- **myRoom/**: Memo, SelectedObjectMenuBar, MyRoomToolBar, Tooltip
- **miniGame/**: MiniGameUI, Crosshair

UI components are React components positioned above the 3D canvas.

## Key Technical Patterns

### Character Movement Sync
- Position updates from Socket.io stored in `PlayersAtom`
- `usePlayer` hook interpolates between current and target position using lerp
- Movement triggers run animation via `useAnimations` from `@react-three/drei`

### Physics Integration
- Uses `@react-three/cannon` for physics simulation
- Gravity set to `[0, -20, 0]` for realistic falling
- Ground structures register bounding boxes for collision detection
- Player checks if position intersects with structure corners

### Animation System
- GLTF models contain armature animations (Idle, Run)
- `useAnimations` hook from `@react-three/drei` manages animation actions
- Fade in/out transitions (0.5s) between animation states
- GSAP used for spawn animations (scale from 0 to 1)

### Camera Behavior
- Isometric camera follows player at fixed offset (+12, +12, +12)
- When near interactive objects, camera zooms to (+6, +6, +6) and focuses on object
- Camera looks at player position or nearby structure

### Room Customization Flow
1. User selects furniture/memo from toolbar → sets `CurrentPlacingMyRoomFurnitureAtom`
2. Ghost preview follows mouse raycast on floor
3. User confirms placement → adds to `CurrentMyRoomPlayerAtom.myRoom.objects`
4. Socket.io syncs to backend and other clients
5. Object can be selected → rotation mode → save new rotation

## Common Development Tasks

### Adding New Interactive Objects to GROUND
1. Create component in `src/components/content/canvas/maps/structures/ground/elements/`
2. Add to ground map index file
3. Register bounding box in `PlayGroundStructuresBoundingBoxAtom` (if interactable)
4. Add interaction handler in `ObjectInteraction.tsx` UI component

### Adding New Furniture to MY_ROOM
1. Add GLTF model to `/public/models/`
2. Create component in `src/components/content/canvas/maps/structures/myRoom/elements/`
3. Add to furniture list in MyRoomToolBar
4. Update `IMyRoomObject` type if needed

### Adding New NPC
1. Create component in `src/components/content/canvas/maps/structures/ground/elements/npc/`
2. Add quest logic with `PlayerCompletedQuestsAtom`
3. Add dialog using `Popup.tsx` component
4. Update quest completion check in NPC component

### Debugging Player Issues
- Check `MeAtom` in Recoil DevTools to verify socket connection
- Verify `playerRef.current.position` matches expected coordinates
- Check `PlayerGroundStructuresFloorPlaneCornersSelector` for collision detection
- Monitor WebSocket messages in Network tab

## Important Notes

- **Socket.io Backend**: Production backend is on Heroku. For local dev, update `clientSocket.ts`
- **3D Model Loading**: Uses `useGLTF` with model paths from `/public/models/`
- **Character Cloning**: MUST use `SkeletonUtils.clone()` when instancing animated GLTF scenes
- **State Updates**: All player state changes should emit socket events for multiplayer sync
- **TypeScript Strict Mode**: Enabled with `noUnusedLocals` and `noUnusedParameters`
- **Physics Performance**: Uses `allowSleep` optimization for inactive rigid bodies

## File Structure Reference

```
src/
├── store/
│   └── PlayersAtom.ts          # All Recoil state atoms
├── sockets/
│   └── clientSocket.ts         # Socket.io client instance
├── data/
│   └── constants.ts            # Game constants
├── components/
│   ├── hooks/
│   │   └── useAnimatedText.ts  # Shared hooks
│   └── content/
│       ├── canvas/
│       │   ├── MainCanvas.tsx  # R3F Canvas wrapper
│       │   └── maps/
│       │       ├── RootMap.tsx # Map router component
│       │       ├── player/     # Player character + hooks
│       │       └── structures/ # Map-specific 3D elements
│       │           ├── ground/
│       │           └── myRoom/
│       └── canvasLayout/
│           └── canvasUserInterfaces/ # 2D UI overlays
│               ├── common/
│               ├── ground/
│               ├── myRoom/
│               └── miniGame/
└── utils.ts                    # Shared utilities
```
