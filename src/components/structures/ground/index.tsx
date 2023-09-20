import { Floor } from "./elements/Floor";
import { Swing } from "./elements/Swing";
import { JungleGym } from "./elements/JungleGym";
import { Slide } from "./elements/Slide";

export const GroundElements = () => {
  return (
    <>
      <Floor />
      <Swing />
      <Slide />
      <JungleGym />
    </>
  );
};
