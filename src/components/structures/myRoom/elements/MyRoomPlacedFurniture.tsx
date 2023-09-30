import { useGLTF } from "@react-three/drei";
import { IPlacedMyRoomObject } from "../../../../store/PlayersAtom";
import { useEffect, useState } from "react";

// 일일이 모델링을 불러와놓고 사용하기
export const MyRoomPlacedFurniture = ({
  placedMyRoomFurniture,
}: {
  placedMyRoomFurniture: IPlacedMyRoomObject;
}) => {
  const modeling = useGLTF(`/models/${placedMyRoomFurniture.name}.glb`);

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    modeling.scene.traverse((obj) => {
      obj.castShadow = true;
      obj.receiveShadow = true;
    });
    setIsLoaded(true);
  }, [modeling.scene]);

  if (isLoaded)
    return (
      <primitive
        visible
        name={`my-room-${placedMyRoomFurniture.name}`}
        object={modeling.scene.clone()}
        scale={placedMyRoomFurniture.scale ?? [1, 1, 1]}
        position={placedMyRoomFurniture.position}
      />
    );
  return null;
};
