import { PageHero, Btn, FeatureList, SectionTitle, CtaBand, Split, eyebrow, wrap, sectionPad } from "../components/ui";

import heroImg from "../assets/img/home-spa.webp";
import brandImg from "../assets/img/images-cosmatics.webp";

const promises = [
  ["Researched formulas", "Developed by Jaji’s Research for Kerala’s climate and hair types."],
  ["Salon tested", "Used every day by our own stylists before it reaches you."],
  ["Finest ingredients", "Sourced carefully and made to high quality standards."],
  ["Delivered to you", "Order online and get it delivered to your door."],
];

export default function Cosmetics() {
  return (
    <div className="bg-white text-black pt-24">
      <PageHero
        image={heroImg}
        alt="Jaji's spa and skin care"
        kicker="Jaji’s Research"
        title="Cosmetics"
        subtitle="Where beauty meets excellence — professional care since 2002."
      >
        <Btn to="/products" variant="light">Shop products</Btn>
        <Btn to="/salons" variant="ghostLight">Visit a salon</Btn>
      </PageHero>

      <Split image={brandImg} alt="Jaji's cosmetics range" reverse aspect="aspect-square">
        <p className={eyebrow}>About our brand</p>
        <h2 className="text-3xl md:text-5xl font-light">Two decades of beauty innovation</h2>
        <p className="text-gray-700 leading-relaxed">
          For over two decades, we have been at the forefront of beauty innovation, crafting products that enhance natural
          beauty while maintaining the highest standards of quality and luxury.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Our commitment to excellence drives us to source the finest ingredients and work with renowned beauty experts to
          create products that deliver exceptional results.
        </p>
        <div>
          <Btn to="/products" variant="solid">View products</Btn>
        </div>
      </Split>

      <section className="bg-gray-100">
        <div className={`${wrap} ${sectionPad}`}>
          <SectionTitle title="The Jaji’s promise" />
          <FeatureList items={promises} />
        </div>
      </section>

      <CtaBand kicker="Shop online" title="Embrace your beauty" text="Transform your daily routine with our premium collection of beauty essentials.">
        <Btn to="/products" variant="light">Products</Btn>
        <Btn to="/salons" variant="ghostLight">Salons</Btn>
      </CtaBand>
    </div>
  );
}
