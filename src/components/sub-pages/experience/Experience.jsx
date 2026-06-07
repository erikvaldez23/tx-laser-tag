import React from "react";
import SEOHead from "../../seo/SEOHead";
import ExperienceHero from "./ExperienceHero";
import Map from "./Map";
import ExperienceContent from "./ExperienceContent";
import Weapons from "./Weapons";
import Carousel from "./Carousel";

const experienceSchema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://txlasercombat.com/experience#webpage",
    "url": "https://txlasercombat.com/experience",
    "name": "The Experience | 15,000 Sq Ft Wasteland Arena & Weapons – Texas Laser Combat Plano",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://txlasercombat.com" },
        { "@type": "ListItem", "position": 2, "name": "Experience", "item": "https://txlasercombat.com/experience" }
      ]
    },
    "isPartOf": { "@id": "https://txlasercombat.com/#business" }
  },
  {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    "name": "Texas Laser Combat Arena",
    "description": "15,000 square foot immersive wasteland-themed laser tag arena in Plano, TX. Features multi-level gameplay, vibration-feedback headsets, and a wide selection of laser tag weapons including rifles, SMGs, and sniper rifles.",
    "url": "https://txlasercombat.com/experience",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2300 Coit Road (off Irvine Drive) #400",
      "addressLocality": "Plano",
      "addressRegion": "TX",
      "postalCode": "75075",
      "addressCountry": "US"
    }
  }
];

export default function ExperiencePage() {
  return (
    <>
      <SEOHead
        title="The Experience | 15,000 Sq Ft Wasteland Arena & Arsenal in Plano, TX"
        description="Explore Texas Laser Combat's 15,000 sq ft immersive wasteland-themed laser tag arena in Plano, TX. State-of-the-art weapons, vibration-feedback headsets, multi-level gameplay, and amenities for the ultimate tactical experience."
        canonical="/experience"
        schema={experienceSchema}
      />
      <main>
        <ExperienceHero />
        <Map fit="contain" backdrop="#111" />
        <Carousel />
        <ExperienceContent />
      </main>
    </>
  );
}
