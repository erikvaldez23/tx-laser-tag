import React from 'react'
import SEOHead from '../../seo/SEOHead'

// About page components
import AboutHero from './AboutHero'
import AboutTestimonials from './AboutTestimonials'
import Community from './Community';
import AboutContent from './AboutContent'
import CTA from '../../key-components/CTA'
import AboutFAQ from './AboutFAQ'
import Contact from '../../key-components/Contact'
import Apply from '../../landing/Apply'

const aboutSchema = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": "https://txlasercombat.com/about#webpage",
    "url": "https://txlasercombat.com/about",
    "name": "About Texas Laser Combat | Veteran & Woman-Owned Laser Tag in Plano, TX",
    "description": "Learn about Texas Laser Combat — a veteran and woman-owned family business bringing premier tactical laser tag to Plano, TX. 15,000 sq ft wasteland-themed arena for ages 7+.",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://txlasercombat.com" },
        { "@type": "ListItem", "position": 2, "name": "About", "item": "https://txlasercombat.com/about" }
      ]
    },
    "isPartOf": { "@id": "https://txlasercombat.com/#business" }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is your cancellation policy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If canceled with more than 72 hours' notice, full refund. With 24-72 hours' notice, forfeit 50% of paid amount, remaining portion can also be refunded to a Gift Card. With less than 24 hours' notice or no-show, forfeit 100% of paid amount. If walking out, full amount retained. No refunds for completed sessions, participant misconduct, or non-compliance. Rescheduling incurs no penalty."
        }
      },
      {
        "@type": "Question",
        "name": "How long is a laser tag session at Texas Laser Combat?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A standard laser tag session lasts 75 minutes, which includes approximately 15 minutes for safety briefings and gearing up, leaving 1 hour of active gameplay."
        }
      },
      {
        "@type": "Question",
        "name": "Are there age or height restrictions to play laser tag?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You must be 7 years old or 46\" in order to play."
        }
      },
      {
        "@type": "Question",
        "name": "Is there a parent viewing area at Texas Laser Combat?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Texas Laser Combat provides a designated parent viewing area where you can watch the action safely and comfortably."
        }
      },
      {
        "@type": "Question",
        "name": "What should I wear for a tactical laser tag session?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Wear closed-toe shoes for safety. The arena is cool at the start, but can heat up as you play, so dress in comfortable, breathable clothing suitable for physical activity."
        }
      }
    ]
  }
];

export default function AboutPage() {
  return (
    <>
      <SEOHead
        title="About Us | Veteran & Woman-Owned Laser Tag in Plano, TX"
        description="Texas Laser Combat is a veteran and woman-owned family business in Plano, TX. Discover our 15,000 sq ft immersive wasteland arena, mission-based gameplay, and community-first mission for ages 7+."
        canonical="/about"
        schema={aboutSchema}
      />
      <main>
        <AboutHero />
        <AboutContent />
        <AboutTestimonials />
        <Community />
        <CTA />
        <AboutFAQ />
        <Apply />
        <Contact />
      </main>
    </>
  );
}