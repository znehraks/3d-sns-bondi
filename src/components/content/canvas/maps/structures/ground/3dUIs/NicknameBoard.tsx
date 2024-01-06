import { Billboard, Text } from "@react-three/drei";
import { Ref, forwardRef } from "react";
import { Group } from "three";

export const NicknameBoard = forwardRef(
  ({ text, isNpc }: { text: string; isNpc?: boolean }, ref: Ref<Group>) => {
    return (
      <Billboard ref={ref}>
        <Text
          font={"/NotoSansKR-Regular.ttf"}
          fontSize={isNpc ? 0.4 : 0.25}
          color={isNpc ? 0xff71c2 : 0x000000}
        >
          {text}
        </Text>
      </Billboard>
    );
  }
);
