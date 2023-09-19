import { Vector3 } from "three";

export const isValidText = (text: string | undefined) => {
  return Boolean(text && text.trim() !== "");
};

export const calculateMinimapPosition = (originalPosition: Vector3) => {
  return {
    x: ((2 * 10) / 3) * originalPosition.x - 5,
    y: ((2 * 10) / 3) * originalPosition.z - 5,
  };
};

interface ICalculateThreePosition {
  clientX: number;
  clientY: number;
}
export const calculateThreePosition = ({
  clientX,
  clientY,
}: ICalculateThreePosition) => {
  return {
    x: (clientX / window.innerWidth) * 2 - 1,
    y: -(clientY / window.innerHeight) * 2 + 1,
  };
};
