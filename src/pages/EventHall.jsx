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
        <Btn href="#venues" variant="ghostLight">Larger venues</Btn>
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

      {/* Venues */}
      <section id="venues" className={`${wrap} ${sectionPad} scroll-mt-24`}>
        <SectionTitle title="Our event venues" sub="Spaces for every size of celebration and business event." />
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 border-t border-gray-200">
          {venues.map(([title, desc, capacity]) => (
            <li key={title} className="border-b border-gray-200 py-8 flex flex-col gap-3">
              <h3 className="text-[1rem] font-medium tracking-[0.14em] uppercase">{title}</h3>
              <p className="text-[0.75rem] tracking-[0.18em] uppercase text-gray-600">{capacity}</p>
              <p className="text-sm text-gray-700 leading-relaxed">{desc}</p>
              <a href="tel:+917034626625" className="mt-1 self-start text-[0.75rem] font-medium tracking-[0.16em] uppercase underline underline-offset-4 hover:no-underline">
                Call to enquire
              </a>
            </li>
          ))}
        </ul>
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

const venues = [
  ["AC conference halls", "Modern air-conditioned halls with the latest technology for meetings and corporate events.", "50–300 attendees"],
  ["Auditoriums", "Spacious auditoriums with premium acoustics and seating for presentations and seminars.", "300–800 attendees"],
  ["Banquet halls", "Elegant décor and fine dining facilities for special celebrations and gatherings.", "100–500 guests"],
  ["Convention halls", "Large flexible halls for exhibitions, trade shows and major business events.", "500–2000 visitors"],
  ["Kalyana mandapams", "Traditional wedding halls with mandap decoration and cultural ambience.", "200–800 guests"],
  ["Reception hall", "Elegant halls for wedding receptions, anniversaries and milestone celebrations.", "150–600 guests"],
];

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
