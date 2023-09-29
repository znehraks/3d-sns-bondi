import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { Mesh } from "three";
import { a } from "@react-spring/three";

export const GsapTest = () => {
  const [isPop, setIsPop] = useState(false);
  const cubeRef = useRef<Mesh>(null);

  // Use R3F's useFrame to render the animation loop

  // 아래 로직을 잘 이용해서, 문이 튀어나오는듯한 애니메이션 추가
  // 각종 화면마다 애니메이션을 더 화려하게 하기

  useEffect(() => {
    if (!cubeRef.current) return;
    if (!isPop) {
      gsap.to(cubeRef.current.rotation, {
        duration: 2,
        y: Math.PI * 3,
        repeat: -1,
        yoyo: true,
        ease: "linear", // Easing function
      });

      gsap.fromTo(
        cubeRef.current.position,
        {
          duration: 2,
          y: -2,
          ease: "linear",
        },
        {
          y: 2,
        }
      );
    } else {
      gsap.fromTo(
        cubeRef.current.position,
        {
          y: 2,
        },
        {
          duration: 2,
          y: 0,
          ease: "linear",
        }
      );
    }
  }, [isPop]);
  useFrame(() => {
    if (!cubeRef.current) return;
    // cubeRef.current.rotation.x += 0.01; // Rotate slightly on the x-axis in addition to gsap animation
  });

  return (
    <a.mesh
      onClick={() => {
        setIsPop((prev) => !prev);
      }}
      ref={cubeRef}
    >
      <boxGeometry args={[1, 1, 1]} />
      <a.meshStandardMaterial color="blue" />
    </a.mesh>
  );
};
