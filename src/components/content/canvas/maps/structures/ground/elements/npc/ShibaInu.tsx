import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { PlayGroundStructuresBoundingBoxAtom } from "../../../../../../../../store/PlayersAtom";
import { useRecoilState } from "recoil";
import { Mesh, Vector3 } from "three";
import { ThreeEvent } from "@react-three/fiber";
import gsap from "gsap";

const name = "ground-shiba-inu";
export const ShibaInu = () => {
  const ref = useRef<Mesh>(null);

  const [, setPlayGroundStructuresBoundingBox] = useRecoilState(
    PlayGroundStructuresBoundingBoxAtom
  );
  const { scene, animations } = useGLTF("/models/Shiba Inu.glb");
  const { actions } = useAnimations(animations, ref);
  const position = useMemo(() => new Vector3(-1, 0, 21), []);
  useEffect(() => {
    if (!ref.current) return;
    scene.traverse((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });

    actions["Walk"]?.play();
    const animation = gsap.to(ref.current.position, {
      duration: 5,
      yoyo: true,
      repeat: -1,
      x: 3,
      ease: "linear",
      onUpdate: () => {
        const progress = animation.progress();
        if (Math.abs(progress) < 0.01) {
          console.log("순 시작");
          ref.current?.lookAt(3, 0, 21);
        } else if (Math.abs(progress) > 0.99) {
          console.log("역 시작");
          ref.current?.lookAt(-1, 0, 21);
        }
      },
    });
    animation.play();
    return () => {
      animation.pause();
    };
  }, [actions, position, scene, setPlayGroundStructuresBoundingBox]);

  return (
    <primitive
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        console.log("강아지와  대화하기");
        // 눌렀을 때 카메라 각도 바뀌면서 좀비랑 대화하는 구도
      }}
      scale={0.7}
      ref={ref}
      visible
      name={name}
      position={position}
      rotation-y={Math.PI / 1.5}
      object={scene}
    />
  );
};
