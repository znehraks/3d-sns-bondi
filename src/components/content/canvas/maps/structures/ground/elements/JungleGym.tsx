import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import { Mesh, Vector3 } from "three";
import { PlayGroundStructuresBoundingBoxAtom } from "../../../../../../../store/PlayersAtom";
import _ from "lodash";
const name = "ground-jungleGym";
const scale = 0.8;
export const JungleGym = () => {
  const { scene } = useGLTF("/models/Jungle gym.glb");
  const [, setPlayGroundStructuresBoundingBox] = useRecoilState(
    PlayGroundStructuresBoundingBoxAtom
  );
  const position = useMemo(() => new Vector3(-12, 0, 6), []);
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
                max: mesh.geometry
                  .boundingBox!.max.clone()
                  .multiplyScalar(scale * 1.4),
                min: mesh.geometry
                  .boundingBox!.min.clone()
                  .multiplyScalar(scale * 1.4),
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
    <primitive
      visible
      name={name}
      scale={[scale, scale, scale]}
      position={position}
      object={scene}
    />
  );
};
