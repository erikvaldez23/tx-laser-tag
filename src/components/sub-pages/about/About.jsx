import React from 'react'

// About page components
import AboutHero from './AboutHero'
import AboutTestimonials from './AboutTestimonials'
import Community from './Community';
import AboutContent from './AboutContent'
import CTA from '../../key-components/CTA'
import AboutFAQ from './AboutFAQ'
import Contact from '../../key-components/Contact'
import Apply from '../../landing/Apply'

export default function AboutPage() {
  return (
    <>
      <AboutHero/>
      <AboutContent />
      <AboutTestimonials />
      <Community />
      <CTA />
      <AboutFAQ />
      <Apply />
      {/* <Contact /> */}
    </>
  );
}