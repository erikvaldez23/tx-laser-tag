import React from 'react';
import EventSubHero from './EventSubHero';
import EventIntroSection from './EventIntroSection';
import EventFeatures from './EventFeatures';
import PartyRoomPackages from './PartyRoomPackages';
import EventImageCarousel from './EventImageCarousel';
import CTA from '../../key-components/CTA';

export default function GroupEvents() {
    return (
        <>
            <EventSubHero
                title={<>GROUP<br />EVENTS</>}
                description="Celebrate birthdays, milestones, and special occasions with an experience everyone can enjoy. Our group laser tag events are private, fully hosted, and designed to be fun, safe, and engaging for all ages and activity levels."
                ctaText="Book Your Group Event"
                image="/events/sub/hero.jpg"
                contentBg="#3E5C47" // Lighter slate for groups
                bgPosition="center 30%" // Shift focus higher up
                onCtaClick={() => window.RollerCheckout ? window.RollerCheckout.show() : window.open('https://ecom.roller.app/texaslasercombat/checkout/en-us/products', '_blank')}
            />
            <EventIntroSection
                heading="Built for squads, not just play"
                text={[
                    "Texas Laser Combat offers a fun, flexible group event experience designed for birthdays, school outings, senior groups, and community gatherings. Our private, fully hosted games create an inclusive environment where participants can play at their own pace while enjoying safe, immersive gameplay.",
                    "From kids’ parties and youth group outings to senior activities and family celebrations, we handle the setup and flow so your group can focus on having fun. With adjustable game modes and experienced staff on site, it’s an engaging experience that works for all ages, abilities, and group sizes, without feeling overwhelming or chaotic."
                ]}
                ctaText="Book online"
                image="/events/company4.jpg"
                onCtaClick={() => window.RollerCheckout ? window.RollerCheckout.show() : window.open('https://ecom.roller.app/texaslasercombat/checkout/en-us/products', '_blank')}
            />
            <EventFeatures
                heading="Great for..."
                image="/events/core.jpg"
                backgroundColor="#3E5C47" // Distinct background for features
                features={[
                    {
                        title: "Group Celebrations",
                        description: "Celebrate birthdays, milestones, and special occasions with a private, fully hosted laser tag experience that’s fun, safe, and engaging for all ages.",
                        icon: "team"
                    },
                    {
                        title: "Seniors & Community Groups",
                        description: "Enjoy a low-impact, customizable laser tag experience designed for comfort, flexibility, and participation at any pace or skill level.",
                        icon: "company" // using 'company' icon which is building/business, generic enough or maybe swap to party
                    },
                    {
                        title: "Schools, Churches & Youth Groups",
                        description: "Bring groups together with supervised, teamwork-focused gameplay that encourages connection, communication, and shared fun.",
                        icon: "party"
                    }
                ]}
            />
            {/* <EventImageCarousel /> */}
            <CTA />
        </>
    );
}
