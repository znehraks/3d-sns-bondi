import { Vector3 } from "three";

export const isValidText = (text: string | undefined) => {
  return Boolean(text && text.trim() !== "");
};

export const calculateMinimapPosition = (originalPosition: Vector3) => {
  return {
    x: 2 * originalPosition.x - 5,
    y: 2 * originalPosition.z - 5,
  };
};
