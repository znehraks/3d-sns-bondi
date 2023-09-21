import { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { Mesh, Vector3 } from "three";
import { useRecoilState } from "recoil";
import { PlayGroundStructuresBoundingBoxAtom } from "../../../../store/PlayersAtom";
import _ from "lodash";

const name = "playStructure";
export function PlayStructure() {
  const [, setPlayGroundStructuresBoundingBox] = useRecoilState(
    PlayGroundStructuresBoundingBoxAtom
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { scene } = useGLTF("/models/Play Structure.glb") as any;

  const position = useMemo(() => new Vector3(0, 3.4, -20), []);
  useEffect(() => {
    scene.traverse((mesh: Mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
    const mesh = scene.children[0] as Mesh;
    if (mesh.geometry.boundingBox) {
      setPlayGroundStructuresBoundingBox((prev) =>
        _.uniqBy(
          [
            ...prev,
            {
              name,
              box: {
                max: mesh.geometry.boundingBox!.max,
                min: mesh.geometry.boundingBox!.min,
              },
              position,
            },
          ],
          "name"
        )
      );
    }
  }, [position, scene, scene.children, setPlayGroundStructuresBoundingBox]);
  return <primitive name={name} scale={3} position={position} object={scene} />;
}
