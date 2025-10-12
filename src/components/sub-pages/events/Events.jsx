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
  return (
    <>
    <EventsHero />
    <PartyRoomPackages />
    <FacilityPackages />
    <EventImageCarousel />
    <EventTypes />
    <CTA />
    <EventsFAQ />
    {/* <CommunityEvents /> */}
    </>
  );
}