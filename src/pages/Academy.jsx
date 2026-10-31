import { useEffect, useState } from "react";
import { API } from "../config/api";
import { PageHero, Btn, SectionTitle, FeatureList, CtaBand, wrap, sectionPad } from "../components/ui";

import heroImg from "../assets/img/home-hero-makeup.webp";

const features = [
  ["Expert instructors", "Learn from industry professionals."],
  ["Practical training", "Hands-on experience with real clients."],
  ["Certification", "Recognised certificates after completion."],
  ["Job placement", "Career assistance and placement support."],
  ["Modern equipment", "Training with the latest tools and technology."],
  ["Small batches", "Personal attention in small groups."],
  ["Flexible schedule", "Convenient timings for all learners."],
  ["Affordable fees", "High-quality education at fair prices."],
];

export default function Academy() {
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    let alive = true;
    API.get("academy/")
      .then((res) => alive && setCourses(res.data?.data || []))
      .catch(() => alive && setCourses([]));
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="bg-white text-black pt-24">
      <PageHero
        image={heroImg}
        alt="Makeup training at Jaji's Academy"
        kicker="Jaji’s Academy"
        title="Courses"
        subtitle="A place where you can learn and grow."
      >
        <Btn href="#courses" variant="light">View courses</Btn>
        <Btn to="/contact" variant="ghostLight">Enquire</Btn>
      </PageHero>

      <section id="courses" className={`${wrap} ${sectionPad} scroll-mt-24`}>
        <SectionTitle title="Explore our programmes" sub="Beauty, makeup and hairdressing courses taught by working professionals." />
        {courses === null ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12" aria-hidden="true">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="flex flex-col gap-3">
                <div className="bg-gray-100 aspect-[4/3] animate-pulse" />
                <div className="h-4 bg-gray-100 w-2/3 animate-pulse" />
              </div>
            ))}
          </div>
        ) : courses.length === 0 ? (
          <p className="text-center text-gray-600">New courses are being added. Contact us for the next batch.</p>
        ) : (
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {courses.map((c) => (
              <li key={c.id} className="flex flex-col gap-3">
                <div className="bg-gray-100 overflow-hidden">
                  {c.image && <img src={c.image} alt={c.course} loading="lazy" className="w-full aspect-[4/3] object-cover" />}
                </div>
                <h3 className="mt-2 text-[1rem] font-medium tracking-[0.12em] uppercase">{c.course}</h3>
                {c.duration && (
                  <p className="text-[0.75rem] tracking-[0.18em] uppercase text-gray-600">Duration · {c.duration}</p>
                )}
                {c.description && <p className="text-sm text-gray-700 leading-relaxed">{c.description}</p>}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="bg-gray-100">
        <div className={`${wrap} ${sectionPad}`}>
          <SectionTitle title="Why choose our academy" />
          <FeatureList items={features} />
        </div>
      </section>

      <CtaBand kicker="Admissions" title="Start your career in beauty" text="Talk to us about course dates, fees and placements.">
        <Btn to="/contact" variant="light">Contact us</Btn>
        <Btn to="/salons" variant="ghostLight">Visit a salon</Btn>
      </CtaBand>
    </div>
  );
}
