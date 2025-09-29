import React from 'react'

// About page components
import AboutHero from './AboutHero'
import AboutTestimonials from './AboutTestimonials'
import Community from './Community';
import AboutContent from './AboutContent'
import CTA from '../../key-components/CTA'
import AboutFAQ from './AboutFAQ'

export default function AboutPage() {
  return (
    <>
      <AboutHero/>
      <AboutContent />
      <AboutTestimonials />
      <Community />
      <AboutFAQ />
      <CTA />
    </>
  );
}