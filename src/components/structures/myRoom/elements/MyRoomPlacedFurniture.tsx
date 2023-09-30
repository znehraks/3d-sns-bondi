import { useGLTF } from "@react-three/drei";
import { IPlacedMyRoomObject } from "../../../../store/PlayersAtom";
import { useEffect, useState } from "react";

// 일일이 모델링을 불러와놓고 사용하기
export const MyRoomPlacedFurniture = ({
  placedMyRoomFurniture,
}: {
  placedMyRoomFurniture: IPlacedMyRoomObject;
}) => {
  console.log("placedMyRoomFurniture", placedMyRoomFurniture);
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
        object={modeling.scene}
        // position={placedMyRoomFurniture.position}
        scale={[10, 10, 10]}
        position={[0, 0, 0]}
      />
    );
  return null;
};
