import React from 'react';
import EventSubHero from './EventSubHero';
import EventIntroSection from './EventIntroSection';
import EventFeatures from './EventFeatures';
import FacilityPackages from './FacilityPackages';
import CTA from '../../key-components/CTA';
import EventImageCarousel from './EventImageCarousel';

export default function CorporateEvents() {
    return (
        <>
            <EventSubHero
                title={<>CORPORATE<br />EVENTS</>}
                description="Trade conference rooms for controlled adrenaline at Texas Laser Combat in Plano, Texas. Our immersive indoor laser arena is built for corporate team building events, company off-sites, and corporate celebrations that truly engage your team, strengthen collaboration, and create lasting memories, without the usual forced icebreakers."
                ctaText="Book online"
                image="/events/sub/hero.jpg"
                contentBg="#15202b"
                bgPosition="center 30%"
                onCtaClick={() => window.RollerCheckout ? window.RollerCheckout.show() : window.open('https://ecom.roller.app/texaslasercombat/checkout/en-us/products', '_blank')}
            />
            <EventIntroSection
                heading="Built for teams, not just play"
                text={[
                    "Texas Laser Combat delivers a high energy corporate event experience designed to bring teams together through strategy, collaboration, and friendly competition. Our private, fully hosted events replace passive outings with immersive gameplay that encourages communication, leadership, and real engagement.",
                    "From team building sessions and company off-sites to holiday parties and client events, we handle the details so your group can focus on having fun. It’s an experience that works for all skill levels, all personalities, and teams of any size, without feeling forced or awkward."
                ]}
                ctaText="Book online"
                image="/events/company4.jpg"
                onCtaClick={() => window.RollerCheckout ? window.RollerCheckout.show() : window.open('https://ecom.roller.app/texaslasercombat/checkout/en-us/products', '_blank')}
            />
            <EventFeatures
                heading="Great for..."
                image="/events/core.jpg"
                features={[
                    {
                        title: "Team building",
                        description: "Strengthen communication, trust, and collaboration through fast paced, mission based gameplay that gets everyone involved, no experience required.",
                        icon: "team"
                    },
                    {
                        title: "Company off sites",
                        description: "Break out of the office and give your team a shared experience that energizes, resets focus, and builds real connections outside of daily routines.",
                        icon: "company"
                    },
                    {
                        title: "Celebrations",
                        description: "Perfect for holiday parties, milestones, and client events, our private laser tag experiences deliver excitement and fun without the pressure of formal programming.",
                        icon: "party"
                    }
                ]}
            />
            <CTA />
            {/* <EventImageCarousel /> */}
        </>
    );
}
