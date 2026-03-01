import Image from "next/image";
import Hero from "./components/sections/Hero"
import Countdown from "./components/sections/Countdown"
import EventsSection from "./components/sections/EventSection";
import RSVPForm from "./components/sections/RSVPForm";
import FamilySection from "./components/sections/FamilySection";
import EnvelopeLoader from "./components/ui/EnvelopeLoader";

export default function Home() {
  return (
    <EnvelopeLoader>
    <main className="bg-[#fdfaf6] text-gray-800">
      <Hero />
      <Countdown />
      <section id="events">
    <EventsSection />
      </section>
      <section id="family">
        <FamilySection />
        </section>
      <section id="rsvp">
        <RSVPForm />
        </section>
      </main>
      </EnvelopeLoader>
  );
}
