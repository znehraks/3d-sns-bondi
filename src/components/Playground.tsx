import { useRecoilState } from "recoil";
import { PlayersAtom } from "../store/PlayersAtom";
import { Floor } from "./Floor";
import { Vector3 } from "three";
import { Man } from "./Man";
import {
  Billboard,
  Box,
  CameraShake,
  Clone,
  Edges,
  Grid,
  Html,
  Instance,
  Instances,
  Line,
  PositionalAudio,
  RoundedBox,
  ScreenQuad,
  ScreenSpace,
  Select,
  Text,
  Trail,
} from "@react-three/drei";
import { PlayStructure } from "./PlayStructure";
import { Slide } from "./Slide";
import { JungleGym } from "./JungleGym";
export const Playground = () => {
  const [players] = useRecoilState(PlayersAtom);
  console.log("players", players);

  return (
    <>
      {/* <Environment preset="sunset" /> */}
      <ambientLight name="ambientLight" intensity={5} />

      <directionalLight
        castShadow
        receiveShadow
        intensity={10}
        position={[0, 50, -50]}
        shadow-normalBias={0.1}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-camera-near={0.1}
        shadow-camera-far={200}
      />

      <PositionalAudio
        position={[0, 0, 0]}
        autoplay
        url="/bgm.mp3"
        distance={1000}
        loop
      />
      <RoundedBox>
        <meshStandardMaterial color={0xff0000} />
      </RoundedBox>
      {/* <Grid infiniteGrid fadeDistance={70} followCamera /> */}
      <ScreenQuad />
      <Line
        points={[
          [0, 0, 0],
          [4, 0, 4],
        ]}
      />
      <Select>
        <Floor />
      </Select>
      <Billboard
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false} // Lock the rotation on the z axis (default=false)
      >
        <Text fontSize={1}>I'm a billboard</Text>
      </Billboard>

      <Text color={"lime"}>hasdsasdaasdssaia</Text>

      <ScreenSpace position={[5, 5, -5]}>
        <Box>jjoojjojo</Box>
      </ScreenSpace>

      <mesh position-x={5}>
        <boxGeometry />

        <meshBasicMaterial />
        <Edges scale={1.1} threshold={15} color="red" />
      </mesh>

      <Trail
        width={0.2} // Width of the line
        color={"hotpink"} // Color of the line
        length={1} // Length of the line
        decay={1} // How fast the line fades away
        local={false} // Wether to use the target's world or local positions
        stride={0} // Min distance between previous and current point
        interval={1} // Number of frames to wait before next calculation
        target={undefined} // Optional target. This object will produce the trail.
        attenuation={(width) => width} // A function to define the width in each point along it.
      >
        {/* If `target` is not defined, Trail will use the first `Object3D` child as the target. */}
        <mesh position={[0, 0, 5]}>
          <sphereGeometry />
          <meshBasicMaterial color={0x123ffd} />
        </mesh>

        {/* You can optionally define a custom meshLineMaterial to use. */}
        {/* <meshLineMaterial color={"red"} /> */}
      </Trail>
      <PlayStructure />
      <Slide />
      <JungleGym />
      {/* <CameraShake
        {...{
          maxYaw: 0.1, // Max amount camera can yaw in either direction
          maxPitch: 0.1, // Max amount camera can pitch in either direction
          maxRoll: 0.1, // Max amount camera can roll in either direction
          yawFrequency: 0.1, // Frequency of the the yaw rotation
          pitchFrequency: 0.1, // Frequency of the pitch rotation
          rollFrequency: 0.1, // Frequency of the roll rotation
          intensity: 1, // initial intensity of the shake
          decay: false, // should the intensity decay over time
          decayRate: 0.65, // if decay = true this is the rate at which intensity will reduce at
          controls: undefined, // if using orbit controls, pass a ref here so we can update the rotation
        }}
      /> */}
      <Html> hiihhi</Html>
      <Instances limit={1000} range={1000}>
        <boxGeometry />
        <meshStandardMaterial color={0xf2f300} />
        <Instance>
          {players.map((player) => (
            <Man
              key={player.id}
              position={
                new Vector3(
                  player.position[0],
                  player.position[1],
                  player.position[2]
                )
              }
              hairColor={player.hairColor}
              topColor={player.topColor}
              bottomColor={player.bottomColor}
            />
          ))}
        </Instance>
      </Instances>
    </>
  );
};
