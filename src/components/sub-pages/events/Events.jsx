import React from 'react'

// About Components
import EventsHero from './EventsHero'
import PartyRoomPackages from './PartyRoomPackages';
import EventImageCarousel from './EventImageCarousel';
import EventTypes from './EventTypes';
import CommunityEvents from './CommunityEvents';
import FacilityPackages from './FacilityPackages';
import EventsFAQ from './EventsFAQ';
import CTA from '../../key-components/CTA'

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
      <EventsHero />
      <PartyRoomPackages onBook={handleBook} />
      <FacilityPackages onBook={handleBook} />
      <EventImageCarousel />
      <EventTypes />
      {/* <CTA /> */}
      <EventsFAQ />
      {/* <CommunityEvents /> */}
    </>
  );
}