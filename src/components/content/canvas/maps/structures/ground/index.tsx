import { Floor } from "./elements/Floor";
import { Swing } from "./elements/Swing";
import { JungleGym } from "./elements/JungleGym";
import { Slide } from "./elements/Slide";
import { Suspense } from "react";
import { Loader } from "../../../../loader/Loader";

export const GroundElements = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Floor />
      <Swing />
      <Slide />
      <JungleGym />
    </Suspense>
  );
};
