import { useEffect, useState } from "react";
import { API } from "../config/api";
import { PageHero, Btn, Stats, SectionTitle, FeatureList, CtaBand, Split, eyebrow, wrap, sectionPad } from "../components/ui";

import food1 from "../assets/img/foodcourt-1.webp";
import food2 from "../assets/img/foodcourt-2.webp";
import food3 from "../assets/img/foodcourt-3.webp";

const PHONE = "+91 70346 26627";

const amenities = [
  ["VIP seating", "Exclusive private dining areas"],
  ["Fast service", "Quick order processing"],
  ["Free Wi-Fi", "High-speed internet access"],
  ["Parking", "Ample parking space available"],
  ["AC dining", "Climate-controlled comfort"],
  ["Takeaway", "Convenient pickup service"],
  ["Sanitised", "Highest hygiene standards"],
];

export default function FoodCourt() {
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    let alive = true;
    API.get("food-court/")
      .then((res) => alive && setMenu(Array.isArray(res.data?.data) ? res.data.data : []))
      .catch(() => alive && setMenu([]));
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="bg-white text-black pt-24">
      <PageHero
        image={food1}
        alt="Jaji's Food Court at Ashramam Maidanam"
        kicker="Ashramam Maidanam · Kollam"
        title="Jaji’s Food Court"
        subtitle="Open air. Great food. Unmatched vibes."
      >
        <Btn href="#menu" variant="light">See the menu</Btn>
        <Btn href={`tel:${PHONE.replace(/\s/g, "")}`} variant="ghostLight">Call {PHONE}</Btn>
      </PageHero>

      <Stats items={[["15+", "Food stalls"], ["500+", "Daily visitors"], ["50+", "Menu items"]]} />

      <Split image={food3} alt="Evening at Jaji's Food Court">
        <p className={eyebrow}>About the food court</p>
        <h2 className="text-3xl md:text-5xl font-light">A vibrant open-air dining destination</h2>
        <p className="text-gray-700 leading-relaxed">
          Located inside the prestigious Ashramam Maidanam, Jaji’s Food Court is a vibrant open-air dining destination in
          the heart of Kollam. Serving delicious South Indian dishes, Chinese favourites, fresh juices and more, it’s the
          perfect spot for families, tourists and evening visitors.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Our signature <strong className="font-medium text-black">Q Chai</strong> tea is also available online through
          Swiggy and Zomato, bringing the taste of Jaji’s straight to your doorstep.
        </p>
        <div>
          <Btn href="#menu" variant="outline">Explore the menu</Btn>
        </div>
      </Split>

      {/* Menu */}
      <section id="menu" className="border-t border-gray-200 scroll-mt-24">
        <div className={`${wrap} ${sectionPad}`}>
          <SectionTitle title="Food menu" sub="Freshly made, every evening." />
          {menu === null ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10" aria-hidden="true">
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <div className="bg-gray-100 aspect-square animate-pulse" />
                  <div className="h-4 bg-gray-100 w-2/3 animate-pulse" />
                </div>
              ))}
            </div>
          ) : menu.length === 0 ? (
            <p className="text-center text-gray-600">The menu will be updated soon. Call us to hear today’s specials.</p>
          ) : (
            <ul className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-7">
              {menu.map((item) => (
                <li key={item.id} className="flex flex-col gap-2">
                  <div className="bg-gray-100 overflow-hidden">
                    {item.image && (
                      <img src={item.image} alt={item.title} loading="lazy" className="w-full aspect-square object-cover" />
                    )}
                  </div>
                  <h3 className="mt-2 text-[0.9rem] font-medium tracking-[0.08em] uppercase leading-snug">{item.title}</h3>
                  {item.description && <p className="text-sm text-gray-600">{item.description}</p>}
                  {item.price != null && <p className="font-medium">₹{Number(item.price).toLocaleString("en-IN")}</p>}
                </li>
              ))}
            </ul>
          )}
          <div className="text-center mt-12">
            <Btn href={`tel:${PHONE.replace(/\s/g, "")}`} variant="solid">Call to order</Btn>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="bg-gray-100">
        <div className={`${wrap} ${sectionPad}`}>
          <SectionTitle title="Amenities" sub="Everything you need for a relaxed evening out." />
          <FeatureList items={amenities} />
        </div>
      </section>

      <Split image={food2} alt="Jaji's Food Court at night" reverse aspect="aspect-[4/3]">
        <p className={eyebrow}>Visit us</p>
        <h2 className="text-3xl md:text-5xl font-light">Ashramam Maidanam, Kollam</h2>
        <p className="text-gray-700">Ashramam Maidanam, Kollam, Kerala 691001</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Btn
            href="https://www.google.com/maps/search/?api=1&query=Jaji%27s%20Food%20Court%20Ashramam%20Kollam"
            target="_blank"
            rel="noopener noreferrer"
            variant="solid"
          >
            Directions
          </Btn>
          <Btn href={`tel:${PHONE.replace(/\s/g, "")}`} variant="outline">Call {PHONE}</Btn>
        </div>
      </Split>

      <CtaBand kicker="Celebrations" title="Planning a get-together?" text="Book the air-conditioned Q Café hall nearby for birthdays, meetings and family events.">
        <Btn to="/event-hall" variant="light">Q Café & Event Hall</Btn>
        <Btn to="/contact" variant="ghostLight">Contact us</Btn>
      </CtaBand>
    </div>
  );
}
