import React from 'react'
import SEOHead from '../../seo/SEOHead'

// About Components
import EventsHero from './EventsHero'
import PartyRoomPackages from './PartyRoomPackages';
import EventImageCarousel from './EventImageCarousel';
import EventTypes from './EventTypes';
import CommunityEvents from './CommunityEvents';
import FacilityPackages from './FacilityPackages';
import EventsFAQ from './EventsFAQ';
import CTA from '../../key-components/CTA'

const eventsSchema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://txlasercombat.com/events#webpage",
    "url": "https://txlasercombat.com/events",
    "name": "Events & Packages | Birthday Parties, Group & Corporate Events – Texas Laser Combat",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://txlasercombat.com" },
        { "@type": "ListItem", "position": 2, "name": "Events", "item": "https://txlasercombat.com/events" }
      ]
    },
    "isPartOf": { "@id": "https://txlasercombat.com/#business" }
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Laser Tag Events & Party Packages",
    "provider": { "@id": "https://txlasercombat.com/#business" },
    "serviceType": "Laser Tag Entertainment",
    "areaServed": { "@type": "City", "name": "Plano, TX" },
    "description": "Birthday parties, group events, and corporate team building laser tag packages in Plano, TX. Private party rooms, customizable game modes, and packages for all group sizes.",
    "url": "https://txlasercombat.com/events",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Laser Tag Event Packages",
      "itemListElement": [
        { "@type": "Offer", "name": "Birthday Party Package", "description": "Private party room + laser tag session for birthday celebrations" },
        { "@type": "Offer", "name": "Group Event Package", "description": "Private or shared arena laser tag for schools, churches, and community groups" },
        { "@type": "Offer", "name": "Corporate Team Building Package", "description": "Mission-based laser tag for corporate teams, off-sites, and client events" }
      ]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is your cancellation policy for events?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Cancellations or rescheduling requests must be made at least 3 days prior to the scheduled event to receive a full refund or reschedule without penalty, subject to management approval."
        }
      },
      {
        "@type": "Question",
        "name": "How long is a laser tag session?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A standard laser tag session lasts 75 minutes, which includes approximately 15 minutes for safety briefings and gearing up, leaving 1 hour of active gameplay."
        }
      },
      {
        "@type": "Question",
        "name": "Are there age restrictions for laser tag?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Players must be at least 7 years old to participate. There are no height restrictions for playing at Texas Laser Combat."
        }
      },
      {
        "@type": "Question",
        "name": "Is there a parent viewing area?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Texas Laser Combat provides a designated parent viewing area where you can watch the action safely and comfortably."
        }
      }
    ]
  }
];

export default function EventsPage() {
  const handleBook = (pkg) => {
    if (pkg?.productId) {
      if (window.RollerCheckout) {
        window.RollerCheckout.show({ productId: pkg.productId });
      } else {
        const url = `https://ecom.roller.app/texaslasercombat/checkout/en-us/product/${pkg.productId}`;
        window.open(url, '_blank');
      }
    } else {
      if (window.RollerCheckout) {
        window.RollerCheckout.show();
      } else {
        console.warn("Roller Checkout not loaded");
      }
    }
  };

  return (
    <>
      <SEOHead
        title="Events & Packages | Birthday Parties, Group & Corporate Laser Tag"
        description="Book laser tag birthday parties, group events, and corporate team building at Texas Laser Combat in Plano, TX. Private party rooms, flexible packages, and immersive gameplay for all ages and group sizes."
        canonical="/events"
        schema={eventsSchema}
      />
      <main>
        <EventsHero />
        <PartyRoomPackages onBook={handleBook} />
        <FacilityPackages onBook={handleBook} />
        <EventImageCarousel />
        <EventTypes />
        <EventsFAQ />
      </main>
    </>
  );
}