import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { PlayGroundStructuresBoundingBoxAtom } from "../../../store/PlayersAtom";
import { useRecoilState } from "recoil";
import _ from "lodash";
import { Mesh, Vector3 } from "three";

const name = "swing";
const scale = 0.04;
export const Swing = () => {
  const [, setPlayGroundStructuresBoundingBox] = useRecoilState(
    PlayGroundStructuresBoundingBoxAtom
  );
  const { scene } = useGLTF("/models/Swing.glb");
  console.log(scene);
  const position = useMemo(() => new Vector3(8, 0, 8), []);
  useEffect(() => {
    scene.traverse((mesh) => {
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
                max: mesh.geometry.boundingBox!.max.clone().multiplyScalar(scale * 1.4),
                min: mesh.geometry.boundingBox!.min.clone().multiplyScalar(scale * 1.4),
              },
              position,
            },
          ],
          "name"
        )
      );
    }
  }, [position, scene, setPlayGroundStructuresBoundingBox]);

  return (
    <primitive name={name} scale={scale} position={position} object={scene} />
  );
};
