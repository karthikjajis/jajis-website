import { PageHero, Btn, Stats, SectionTitle, FeatureList, CtaBand, Split, eyebrow, wrap, sectionPad } from "../components/ui";

import heroImg from "../assets/img/saloon-3.webp";
import storyImg from "../assets/img/saloon-1.webp";
import founderImg from "../assets/img/founder-jajimole.webp";
import directorImg from "../assets/img/management-jaji-main-image.webp";
import ceoImg from "../assets/img/management-ceo.webp";

const team = [
  { name: "Dr. Jajimole K", role: "Founder & Director", image: founderImg },
  { name: "Keerthi Sunil", role: "Director", image: directorImg },
  { name: "Karthik Sunil", role: "Creative Director", image: ceoImg },
];

const values = [
  ["Excellence", "We strive for excellence in everything we do."],
  ["Innovation", "Constantly innovating to serve you better."],
  ["Integrity", "Honest and transparent in all operations."],
  ["Customer focus", "Our customers are always our top priority."],
];

const offer = [
  ["Beauty salons", "Professional beauty services for all.", "/salons"],
  ["Cosmetics", "Premium beauty products, made by Jaji’s Research.", "/cosmetics"],
  ["Event halls", "Perfect venues for celebrations.", "/event-hall"],
  ["Food court", "Open-air dining at Ashramam Maidanam.", "/food-court"],
  ["Designing & stitching", "Custom fashion, bridal wear and tailoring.", "/designing-stitching"],
  ["Academy", "Professional beauty and hairdressing training.", "/academy"],
];

export default function AboutUs() {
  return (
    <div className="bg-white text-black pt-24">
      <PageHero image={heroImg} alt="Inside a Jaji's salon" kicker="Since 2002 · Kerala" title="About us" subtitle="Beauty, lifestyle and celebration — under one family brand." />

      <Stats items={[["20+", "Years experience"], ["10,00,000+", "Happy customers"], ["200+", "Team members"], ["7", "Businesses"]]} />

      <Split image={storyImg} alt="A Jaji's salon">
        <p className={eyebrow}>Our journey</p>
        <h2 className="text-3xl md:text-5xl font-light">Crafting excellence since day one</h2>
        <p className="text-gray-700 leading-relaxed">
          Founded with a vision to provide exceptional beauty and lifestyle services, Jaji’s has grown from a small local
          business to a comprehensive service provider that touches lives across communities.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Our mission has always been to make beauty and wellness accessible to everyone while maintaining the highest
          standards of quality and professionalism.
        </p>
        <dl className="grid sm:grid-cols-2 gap-x-8">
          <div className="border-t border-gray-200 py-5">
            <dt className="text-[0.85rem] font-medium tracking-[0.12em] uppercase">Our mission</dt>
            <dd className="mt-1 text-sm text-gray-600">
              To provide innovative, high-quality beauty and lifestyle services that enhance confidence and well-being,
              making every client feel valued and beautiful.
            </dd>
          </div>
          <div className="border-t border-gray-200 py-5">
            <dt className="text-[0.85rem] font-medium tracking-[0.12em] uppercase">Our vision</dt>
            <dd className="mt-1 text-sm text-gray-600">
              To be the leading beauty and lifestyle brand, known for innovation, excellence and customer satisfaction
              across all our services.
            </dd>
          </div>
        </dl>
      </Split>

      {/* Leadership */}
      <section className="border-t border-gray-200">
        <div className={`${wrap} ${sectionPad}`}>
          <SectionTitle title="Our leadership team" sub="The family behind Jaji’s." />
          <ul className="grid sm:grid-cols-3 gap-x-6 gap-y-12">
            {team.map((m) => (
              <li key={m.name} className="flex flex-col gap-3">
                <img src={m.image} alt={m.name} loading="lazy" className="w-full aspect-[4/5] object-cover object-top bg-gray-100" />
                <h3 className="mt-2 text-[1rem] font-medium tracking-[0.12em]">{m.name}</h3>
                <p className="text-[0.75rem] tracking-[0.18em] uppercase text-gray-600">{m.role}</p>
              </li>
            ))}
          </ul>
          <div className="text-center mt-12">
            <Btn to="/management" variant="outline">Meet the management</Btn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-100">
        <div className={`${wrap} ${sectionPad}`}>
          <SectionTitle title="Our core values" />
          <FeatureList items={values} />
        </div>
      </section>

      {/* What we offer */}
      <section className={`${wrap} ${sectionPad}`}>
        <SectionTitle title="What we offer" />
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 border-t border-gray-200">
          {offer.map(([title, desc, to]) => (
            <li key={title} className="border-b border-gray-200">
              <Btn to={to} variant={null} className="group flex items-start justify-between gap-4 py-7">
                <span>
                  <span className="block text-[0.95rem] font-medium tracking-[0.12em] uppercase">{title}</span>
                  <span className="block mt-1 text-sm text-gray-600">{desc}</span>
                </span>
                <span aria-hidden="true" className="text-xl group-hover:translate-x-1 transition-transform">→</span>
              </Btn>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand kicker="Visit us" title="Ready to experience excellence?" text="Join the families across Kerala who trust Jaji’s with their beauty and lifestyle needs.">
        <Btn to="/salons" variant="light">Find a salon</Btn>
        <Btn to="/contact" variant="ghostLight">Contact us</Btn>
      </CtaBand>
    </div>
  );
}
