import { PageHero, Btn, SectionTitle, FeatureList, CtaBand, Split, eyebrow, wrap, sectionPad } from "../components/ui";

import heroImg from "../assets/img/design-7.webp";
import storeImg from "../assets/img/design-2.webp";
import g1 from "../assets/img/design-4.webp";
import g2 from "../assets/img/design-6.webp";
import g3 from "../assets/img/design-5.webp";
import g4 from "../assets/img/design-8.webp";

const PHONE = "+91 96452 96450";

const services = [
  ["Custom design", "Personalised clothing designed around your style.", ["Personal consultation", "Custom sketching", "Colour palette selection", "Fabric consultation"]],
  ["Bridal wear", "Exquisite bridal collections for your special day.", ["Designer wedding gowns", "Bridal lehengas", "Custom accessories", "Professional alterations"]],
  ["Party wear", "Elegant attire for every celebration.", ["Evening gowns", "Cocktail dresses", "Designer sarees", "Formal suits"]],
  ["Casual wear", "Comfortable and stylish everyday clothing.", ["Designer tops", "Casual dresses", "Trendy pants", "Contemporary kurtas"]],
  ["Alterations", "Expert fitting and modification services.", ["Precise size adjustments", "Professional hemming", "Custom darting", "Perfect fitting"]],
  ["Embroidery", "Intricate hand and machine embroidery.", ["Traditional zari work", "Stone embellishment", "Sequin detailing", "Luxury beading"]],
];

const steps = [
  ["Consultation", "Discuss your vision and requirements with our designers."],
  ["Design", "We create bespoke designs and select premium fabrics."],
  ["Stitching", "Expert craftsmanship and meticulous finishing."],
  ["Fitting", "Final fitting and precision adjustments."],
];

const why = [
  ["Premium quality", "Only the finest fabrics and materials for exceptional results."],
  ["Expert team", "Skilled designers and tailors with years of experience."],
  ["Bespoke service", "Personal attention to every detail of your design."],
];

const gallery = [
  [g1, "Floral embroidery on a blouse"],
  [g2, "Zari border being hand-finished"],
  [g3, "A tailor at work in the studio"],
  [g4, "The stitching workshop"],
];

export default function DesigningStitching() {
  return (
    <div className="bg-white text-black pt-24">
      <PageHero
        image={heroImg}
        alt="Outfits from Jaji's Designing & Stitching Studio"
        kicker="Polayathodu · Kollam"
        title="Designing & Stitching"
        subtitle="Where elegance meets craftsmanship."
      >
        <Btn href="#services" variant="light">Our services</Btn>
        <Btn href={`tel:${PHONE.replace(/\s/g, "")}`} variant="ghostLight">Book a consultation</Btn>
      </PageHero>

      {/* Services */}
      <section id="services" className={`${wrap} ${sectionPad} scroll-mt-24`}>
        <SectionTitle title="Our services" sub="Women’s fashion, bridal wear and tailoring — made to measure." />
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 border-t border-gray-200">
          {services.map(([title, desc, features]) => (
            <li key={title} className="border-b border-gray-200 py-8">
              <h3 className="text-[1rem] font-medium tracking-[0.14em] uppercase">{title}</h3>
              <p className="mt-2 text-sm text-gray-700">{desc}</p>
              <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-600">
                {features.map((f) => (
                  <li key={f} className="before:content-['—'] before:mr-2">{f}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      {/* Gallery */}
      <section className="grid grid-cols-2 md:grid-cols-4">
        {gallery.map(([src, alt]) => (
          <img key={src} src={src} alt={alt} loading="lazy" className="w-full aspect-[3/4] object-cover" />
        ))}
      </section>

      {/* Process */}
      <section className={`${wrap} ${sectionPad}`}>
        <SectionTitle title="Our process" />
        <FeatureList items={steps} />
      </section>

      {/* Why us */}
      <section className="bg-gray-100">
        <div className={`${wrap} ${sectionPad}`}>
          <SectionTitle title="Why choose us" />
          <FeatureList items={why} cols={3} />
        </div>
      </section>

      <Split image={storeImg} alt="Jaji's Designing & Stitching Studio storefront" aspect="aspect-[16/10]">
        <p className={eyebrow}>Visit the studio</p>
        <h2 className="text-3xl md:text-5xl font-light">Jaji’s Designing & Stitching Studio</h2>
        <p className="text-gray-700">Opposite KFC, Polayathodu, Kollam, Kerala 691021</p>
        <p className="text-gray-700">Jaji’s Designs is also available online — explore exclusive collections anytime.</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Btn href={`tel:${PHONE.replace(/\s/g, "")}`} variant="solid">Call {PHONE}</Btn>
          <Btn
            href="https://www.google.com/maps/search/?api=1&query=Jaji%27s%20Designing%20%26%20Stitching%20Studio%20Polayathodu%20Kollam"
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
          >
            Directions
          </Btn>
        </div>
      </Split>

      <CtaBand kicker="Made to measure" title="Ready to create your perfect outfit?" text="Book a consultation and let us bring your vision to life with precision and elegance.">
        <Btn href={`tel:${PHONE.replace(/\s/g, "")}`} variant="light">Call the studio</Btn>
        <Btn to="/contact" variant="ghostLight">Contact us</Btn>
      </CtaBand>
    </div>
  );
}
