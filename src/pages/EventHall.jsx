import QCafeBooking from "../components/QCafeBooking";
import { PageHero, Btn, SectionTitle, FeatureList, CtaBand, eyebrow, wrap, sectionPad } from "../components/ui";


import eventbg from "../assets/img/event-hall-2.webp";
import event from "../assets/img/event-hall-3.webp";
import event1 from "../assets/img/event-hall-1.webp";

export default function EventHall() {
  return (
    <div className="bg-white text-black pt-24">
      <PageHero
        image={eventbg}
        alt="A celebration at Jaji's Q Café & Event Hall"
        kicker="Near Children’s Park · Asramam, Kollam"
        title="Jaji’s Q Café & Event Hall"
        subtitle="Celebrate life’s most important moments in style."
      >
        <Btn href="#qcafe-booking" variant="light">Book the Q Café hall</Btn>
        <Btn href="tel:+917034626625" variant="ghostLight">Call +91 70346 26625</Btn>
      </PageHero>

      <QCafeBooking />

      {/* About */}
      <section className="bg-gray-100">
        <div className={`${wrap} ${sectionPad} grid gap-12 md:grid-cols-2 items-center`}>
          <div className="flex flex-col gap-6">
            <p className={eyebrow}>Where celebrations come alive</p>
            <h2 className="text-3xl md:text-5xl font-light">More than a café</h2>
            <p className="text-gray-700 leading-relaxed">
              Jaji’s Q Café &amp; Event Hall has transformed an underused DTPC hangar into one of Kollam’s most vibrant
              lifestyle and event destinations — a cultural hub where food, music and celebrations meet.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Its auditorium seats 400+ guests and is ideal for weddings, seminars, award functions, product launches and
              grand celebrations.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <img src={event} alt="Event hall set up for a function" loading="lazy" className="w-full aspect-[3/4] object-cover" />
            <img src={event1} alt="Guests at an event" loading="lazy" className="w-full aspect-[3/4] object-cover mt-10" />
          </div>
        </div>
      </section>




      {/* Amenities */}
      <section className="bg-gray-100">
        <div className={`${wrap} ${sectionPad}`}>
          <SectionTitle title="Venue amenities" sub="Everything you need for a seamless event." />
          <FeatureList items={amenities} />
        </div>
      </section>

      <CtaBand kicker="Events" title="Ready to plan your event?" text="Our team will help you with the hall, catering, decoration and more.">
        <Btn href="tel:+917034626625" variant="light">Call +91 70346 26625</Btn>
        <Btn to="/contact" variant="ghostLight">Contact us</Btn>
      </CtaBand>
    </div>
  );
}

const amenities = [
  ["Catering services"],
  ["Audio & visual equipment"],
  ["Free Wi-Fi"],
  ["Parking space"],
  ["Decoration services"],
  ["Professional staff"],
  ["Climate control"],
  ["Security services"],
];
