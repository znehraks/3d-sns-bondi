import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export const CubeMan = () => {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(`/models/Steve.glb`);
  const { actions } = useAnimations(animations, group);

  useFrame(() => {
    actions[
      "CharacterArmature|CharacterArmature|CharacterArmature|Run"
    ]?.play();
  });
  return <primitive ref={group} object={scene}></primitive>;
};

useGLTF.preload("/models/Steve.glb");
