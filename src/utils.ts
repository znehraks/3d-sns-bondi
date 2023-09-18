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
