import React from 'react'

// About Components
import AboutHero from './AboutHero'
import AboutTestimonials from './AboutTestimonials'
import Community from './Community';
import AboutContent from './AboutContent'
import CTA from '../../key-components/CTA'

export default function AboutPage() {
  return (
    <>
      <AboutHero/>
      <AboutContent />
      {/* <AboutTestimonials /> */}
      {/* <Community /> */}
      <CTA />
    </>
  );
}