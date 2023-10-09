import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { PlayGroundStructuresBoundingBoxAtom } from "../../../../../../../store/PlayersAtom";
import { useRecoilState } from "recoil";
import { SkeletonUtils } from "three-stdlib";

const name = "ground-tree";
export const Tree = ({ position }: { position: number[] }) => {
  const [, setPlayGroundStructuresBoundingBox] = useRecoilState(
    PlayGroundStructuresBoundingBoxAtom
  );
  const { scene: scene_ } = useGLTF("/models/Tree.glb");
  // useGLTF의 디폴트 캐싱 방지
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const scene = useMemo(() => SkeletonUtils.clone(scene_), []);
  useEffect(() => {
    scene.traverse((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
  }, [position, scene, setPlayGroundStructuresBoundingBox]);

  return (
    <primitive
      visible
      name={name}
      scale={1}
      position={position}
      object={scene}
    />
  );
};
