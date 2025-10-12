import React from "react";
import ExperienceHero from "./ExperienceHero";
import Map from "./Map";
import ExperienceContent from "./ExperienceContent";
import Weapons from "./Weapons";
import Carousel from "./Carousel";

export default function ExperiencePage() {
  return (
    <>
      <ExperienceHero />
    <Map fit="contain" backdrop="#111" />

      <Carousel />
      <ExperienceContent />
    </>
  );
}
