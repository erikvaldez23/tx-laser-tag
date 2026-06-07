import React from 'react';
import SEOHead from '../../seo/SEOHead';
import PrivacyHero from './PrivacyHero';
import PrivacyContent from './PrivacyContent';
import Contact from '../../key-components/Contact';
import CTA from '../../key-components/CTA';

const privacySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://txlasercombat.com/privacy#webpage",
  "url": "https://txlasercombat.com/privacy",
  "name": "Privacy Policy – Texas Laser Combat",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://txlasercombat.com" },
      { "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": "https://txlasercombat.com/privacy" }
    ]
  }
};

export default function PrivacyPage() {
    return (
        <>
          <SEOHead
            title="Privacy Policy"
            description="Read the Texas Laser Combat privacy policy. Learn how we collect, use, and protect your personal information when you visit our Plano, TX laser tag facility."
            canonical="/privacy"
            schema={privacySchema}
          />
          <main>
            <PrivacyHero />
            <PrivacyContent />
            <CTA />
            <Contact />
          </main>
        </>
    );
}
