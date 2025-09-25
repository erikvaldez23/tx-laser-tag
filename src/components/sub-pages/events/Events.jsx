import React from 'react'

// About Components
import EventsHero from './EventsHero'
import PartyRoomPackages from './PartyRoomPackages';
import EventImageCarousel from './EventImageCarousel';
import EventTypes from './EventTypes'
import CommunityEvents from './CommunityEvents'

export default function EventsPage() {
  return (
    <>
    <EventsHero />
    <PartyRoomPackages />
    <EventImageCarousel />
    <EventTypes />
    <CommunityEvents />
    </>
  );
}