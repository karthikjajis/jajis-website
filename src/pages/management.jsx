import { PageHero, Btn, SectionTitle, CtaBand, eyebrow, wrap, sectionPad } from "../components/ui";

import heroImg from "../assets/img/management-jajis1.webp";
import founderImg from "../assets/img/founder-jajimole.webp";
import quoteImg from "../assets/img/management-jajis.webp";
import keerthiImg from "../assets/img/management-jaji-main-image.webp";
import karthikImg from "../assets/img/management-ceo.webp";

const nextGen = [
  {
    name: "Keerthi Sunil",
    role: "Director — “The Next Jaji”",
    image: keerthiImg,
    bio: "A talented makeup and nail artist with dual Master’s degrees in Business Management and English Literature, Keerthi blends artistic expression with strategic insight. Carrying forward her mother’s legacy, she ensures Jaji’s Innovation remains a modern creative hub rooted in excellence.",
  },
  {
    name: "Karthik Sunil",
    role: "Creative Director — “The Art of Transformation”",
    image: karthikImg,
    bio: "With a Master’s in Entrepreneurship & Innovation Management from Loughborough University and Vidal Sassoon certification, Karthik brings global expertise to advanced hair artistry. His experience at Rush UK salons positions him as a leading innovator in contemporary styling.",
  },
];

export default function Management() {
  return (
    <div className="bg-white text-black pt-24">
      <PageHero
        image={heroImg}
        alt="The Jaji's team"
        kicker="Jaji’s Innovation Pvt. Ltd."
        title="Management"
        subtitle="The visionaries shaping the future of Jaji’s Innovation."
      />

      {/* Founder */}
      <section className={`${wrap} ${sectionPad} grid gap-12 md:grid-cols-2 items-center`}>
        <figure className="m-0">
          <img src={founderImg} alt="Dr. Jajimole K, founder of Jaji's Innovation" loading="lazy" className="w-full aspect-[4/5] object-cover object-[50%_30%]" />
          <figcaption className="mt-3 text-[0.75rem] tracking-[0.18em] uppercase text-gray-600">Dr. Jajimole K · Founder &amp; Director</figcaption>
        </figure>
        <div className="flex flex-col gap-6">
          <p className={eyebrow}>Founder &amp; Director, Jaji’s Innovation Pvt. Ltd.</p>
          <h2 className="text-3xl md:text-5xl font-light">Dr. Jajimole K</h2>
          <p className="text-gray-700 leading-relaxed">
            Dr. Jajimole K is the visionary force and guiding spirit behind Jaji’s Innovation Pvt. Ltd., a multi-brand
            beauty, wellness and lifestyle company that has transformed Kerala’s beauty industry over the past two decades.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Trained at reputed international institutes, she developed a philosophy that blends clinical precision with
            artistic creativity — a concept widely known as <strong className="font-medium text-black">“The Beautiful Science.”</strong>
          </p>
          <p className="text-gray-700 leading-relaxed">
            Under her leadership, Jaji’s Innovation has expanded into luxury unisex salons, kids’ salons, cafés, food courts,
            cosmetic and skincare lines, and upcoming luxe skin &amp; hair clinics, employing over 150 professionals.
          </p>
        </div>
      </section>

      {/* Quote */}
      <section className="relative bg-black">
        <img src={quoteImg} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <blockquote className="relative max-w-4xl mx-auto px-6 py-24 md:py-32 text-center text-white">
          <p className="text-2xl md:text-4xl font-light leading-snug">
            “Beauty is not just appearance, but confidence, wellness and empowerment.”
          </p>
          <footer className="mt-6 text-[0.75rem] tracking-[0.2em] uppercase text-gray-300">Dr. Jajimole K</footer>
        </blockquote>
      </section>

      {/* Next generation */}
      <section className={`${wrap} ${sectionPad}`}>
        <SectionTitle title="The next generation of leadership" />
        <ul className="grid md:grid-cols-2 gap-x-8 gap-y-14">
          {nextGen.map((p) => (
            <li key={p.name} className="flex flex-col gap-3">
              <img src={p.image} alt={p.name} loading="lazy" className="w-full aspect-[4/5] object-cover object-top bg-gray-100" />
              <h3 className="mt-2 text-[1.1rem] font-medium tracking-[0.12em]">{p.name}</h3>
              <p className="text-[0.75rem] tracking-[0.18em] uppercase text-gray-600">{p.role}</p>
              <p className="text-gray-700 leading-relaxed">{p.bio}</p>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand title="Turning passion into innovation, and beauty into confidence." kicker="Dr. Jajimole K">
        <Btn to="/about-us" variant="light">About Jaji’s</Btn>
        <Btn to="/franchise" variant="ghostLight">Franchise</Btn>
      </CtaBand>
    </div>
  );
}
