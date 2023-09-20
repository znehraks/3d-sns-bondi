import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { PlayGroundStructuresBoundingBoxAtom } from "../../../../store/PlayersAtom";
import { useRecoilState } from "recoil";
import _ from "lodash";
import { Mesh, Vector3 } from "three";

const name = "slide";
export const Slide = () => {
  const [, setPlayGroundStructuresBoundingBox] = useRecoilState(
    PlayGroundStructuresBoundingBoxAtom
  );
  const { scene } = useGLTF("/models/Slide.glb");
  const position = useMemo(() => new Vector3(7, 0, -8), []);
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
                max: mesh.geometry.boundingBox!.max.clone().multiplyScalar(1.4),
                min: mesh.geometry.boundingBox!.min.clone().multiplyScalar(1.4),
              },
              position,
            },
          ],
          "name"
        )
      );
    }
  }, [position, scene, setPlayGroundStructuresBoundingBox]);

  return <primitive name={name} position={position} object={scene} />;
};
