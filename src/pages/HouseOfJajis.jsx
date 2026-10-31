import { Btn, SectionTitle, CtaBand, eyebrow, wrap, sectionPad } from "../components/ui";
import render from "../assets/img/house-of-jajis.webp";

export const HOJ_FLOORS = [
  ["Ground floor", "Jaji’s Signature Skin & Hair Clinic", "Advanced skin and hair treatments in a dedicated clinic."],
  ["First floor", "Jaji’s Salon", "Our family salon — hair, beauty and grooming that is affordable to all."],
  ["Second floor", "Jaji’s Luxe", "A premium lounge for an exclusive, luxury salon experience."],
  ["Academy", "Jaji’s Academy", "A home for training the next generation of beauty and hair professionals."],
];

export default function HouseOfJajis() {
  return (
    <div className="bg-white text-black pt-24">
      {/* Intro with the render */}
      <section className={`${wrap} ${sectionPad} grid gap-12 md:grid-cols-2 items-center`}>
        <figure className="m-0 order-2 md:order-1">
          <img
            src={render}
            alt="Architect's render of House of Jaji's, a four-storey building in Kollam with Hair · Skin · Academy signage"
            fetchpriority="high"
            width="1400"
            height="1448"
            className="w-full aspect-[4/5] object-cover bg-gray-100"
          />
          <figcaption className="mt-3 text-[0.75rem] tracking-[0.18em] uppercase text-gray-600">Architect’s render</figcaption>
        </figure>
        <div className="flex flex-col gap-6 order-1 md:order-2">
          <p className={eyebrow}>Coming soon · Kollam</p>
          <h1 className="text-[2.1rem] sm:text-5xl lg:text-6xl font-light">House of Jaji’s</h1>
          <p className="text-[0.8rem] font-medium tracking-[0.2em] uppercase">Hair · Skin · Academy</p>
          <p className="text-gray-700 leading-relaxed">
            House of Jaji’s is a new 13,000 sq ft destination in Kollam by the Jaji’s Group — bringing Jaji’s Signature Skin &amp; Hair Clinic,
            our salon, premium lounge and academy together under one roof.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The building is in its final stage of completion. Opening soon.
          </p>
          <dl className="grid grid-cols-2 gap-x-8 border-t border-gray-200">
            <div className="py-5">
              <dt className="text-[0.75rem] tracking-[0.18em] uppercase text-gray-600">Size</dt>
              <dd className="mt-1 text-3xl font-light">13,000 sq ft</dd>
            </div>
            <div className="py-5">
              <dt className="text-[0.75rem] tracking-[0.18em] uppercase text-gray-600">Status</dt>
              <dd className="mt-1 text-3xl font-light">Final stage</dd>
            </div>
          </dl>
          <div className="flex flex-col sm:flex-row gap-3">
            <Btn href="#inside" variant="solid">What’s inside</Btn>
            <Btn href="https://wa.me/919744012345?text=Hi%2C%20please%20keep%20me%20updated%20about%20the%20House%20of%20Jaji%27s%20opening." target="_blank" rel="noopener noreferrer" variant="outline">
              Get opening updates
            </Btn>
          </div>
        </div>
      </section>

      {/* Floors */}
      <section id="inside" className="bg-gray-100 scroll-mt-24">
        <div className={`${wrap} ${sectionPad}`}>
          <SectionTitle title="What’s inside" sub="Four experiences, one address." />
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {HOJ_FLOORS.map(([floor, name, desc]) => (
              <li key={name} className="border-t border-black pt-5">
                <span className="text-[0.75rem] tracking-[0.18em] uppercase text-gray-500">{floor}</span>
                <h3 className="mt-2 text-[1.05rem] font-medium tracking-[0.12em]">{name}</h3>
                <p className="mt-2 text-sm text-gray-600">{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand kicker="Opening soon" title="Be the first to know when we open" text="Message us on WhatsApp and we’ll share opening dates and launch offers.">
        <Btn href="https://wa.me/919744012345?text=Hi%2C%20please%20keep%20me%20updated%20about%20the%20House%20of%20Jaji%27s%20opening." target="_blank" rel="noopener noreferrer" variant="light">
          WhatsApp us
        </Btn>
        <Btn to="/salons" variant="ghostLight">Visit our salons today</Btn>
      </CtaBand>
    </div>
  );
}
