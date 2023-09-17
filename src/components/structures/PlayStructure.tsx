/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 public/models/Play Structure.glb -o src/components/PlayStructure.jsx -r public 
*/

import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Group } from "three";

export function PlayStructure() {
  const ref = useRef<Group>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { nodes, materials } = useGLTF("/models/Play Structure.glb") as any;

  useEffect(() => {
    if (ref.current) {
      ref.current.traverse((mesh) => {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      });
    }
  }, []);
  return (
    <group ref={ref} scale={3} castShadow receiveShadow dispose={null}>
      <mesh
        geometry={nodes.group1368097063.geometry}
        material={materials.mat2}
      />
      <mesh
        geometry={nodes.group109344335.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group519692184.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group1054676861.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group1826054861.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group412268553.geometry}
        material={materials.mat2}
      />
      <mesh
        geometry={nodes.group2043381903.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group1345136376.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group472145431.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group1679339899.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group1733822416.geometry}
        material={materials.mat2}
      />
      <mesh
        geometry={nodes.group1527908378.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group1988386165.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group954731563.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group1079088052.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group863908667.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group1499783986.geometry}
        material={materials.mat2}
      />
      <mesh
        geometry={nodes.group794485603.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group1870356965.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group2070708813.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group2011796231.geometry}
        material={materials.mat20}
      />
      <mesh
        geometry={nodes.group1613961528.geometry}
        material={materials.mat20}
      />
      <mesh
        geometry={nodes.group1904187001.geometry}
        material={materials.mat2}
      />
      <mesh
        geometry={nodes.group362017458.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group1643095730.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group1780989060.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group545484886.geometry}
        material={materials.mat2}
      />
      <mesh
        geometry={nodes.group74795240.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group1220922082.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group1296622839.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group1811744593.geometry}
        material={materials.mat20}
      />
      <mesh
        geometry={nodes.group1908301317.geometry}
        material={materials.mat20}
      />
      <mesh
        geometry={nodes.group182100783.geometry}
        material={materials.mat2}
      />
      <mesh
        geometry={nodes.group448713913.geometry}
        material={materials.mat2}
      />
      <mesh
        geometry={nodes.group1914794782.geometry}
        material={materials.mat2}
      />
      <mesh
        geometry={nodes.group299249815.geometry}
        material={materials.mat20}
      />
      <mesh
        geometry={nodes.group71365155.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group1226028820.geometry}
        material={materials.mat20}
      />
      <mesh
        geometry={nodes.group1008882630.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group425385465.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group871030222.geometry}
        material={materials.mat20}
      />
      <mesh
        geometry={nodes.group1056127365.geometry}
        material={materials.mat2}
      />
      <mesh
        geometry={nodes.group98641283.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group1396644794.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group225793773.geometry}
        material={materials.mat2}
      />
      <mesh
        geometry={nodes.group1626368707.geometry}
        material={materials.mat2}
      />
      <mesh
        geometry={nodes.group1459119480.geometry}
        material={materials.mat2}
      />
      <mesh
        geometry={nodes.group1445582639.geometry}
        material={materials.mat2}
      />
      <mesh
        geometry={nodes.group62353271.geometry}
        material={materials.mat21}
      />
      <mesh
        geometry={nodes.group1957833562.geometry}
        material={materials.mat2}
      />
      <mesh
        geometry={nodes.group1502849154.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group1518409211.geometry}
        material={materials.mat2}
      />
      <mesh
        geometry={nodes.group772221823.geometry}
        material={materials.mat21}
      />
      <mesh
        geometry={nodes.group905881478.geometry}
        material={materials.mat15}
      />
      <mesh
        geometry={nodes.group393602705.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group634390878.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group919146556.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group215912838.geometry}
        material={materials.mat2}
      />
      <mesh
        geometry={nodes.group1721679538.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group1467029832.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group1626367552.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group1604971012.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group2023130564.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group1985781341.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group1550252458.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group832778106.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group267854177.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group859758212.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group632006999.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group638899843.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group1180122693.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group1868284783.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group1787619521.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.mesh1487250920.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.mesh1487250920_1.geometry}
        material={materials.mat21}
      />
      <mesh
        geometry={nodes.mesh1647395270.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.mesh1647395270_1.geometry}
        material={materials.mat21}
      />
      <mesh
        geometry={nodes.mesh1386077998.geometry}
        material={materials.mat21}
      />
      <mesh
        geometry={nodes.mesh1386077998_1.geometry}
        material={materials.mat10}
      />
    </group>
  );
}

useGLTF.preload("/models/Play Structure.glb");