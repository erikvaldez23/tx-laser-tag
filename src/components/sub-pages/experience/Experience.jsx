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
      <Map
        src="/experience.png"
        alt="Texas Laser Combat arena overview"
        sx={{ mb: (theme) => theme.spacing(8) }}
      />
      <Carousel />
      <ExperienceContent />
    </>
  );
}
