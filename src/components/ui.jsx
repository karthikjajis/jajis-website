// Shared building blocks for the black & white editorial look used across the site.
import { Link } from "react-router-dom";

const base =
  "inline-flex items-center justify-center min-w-[180px] px-7 py-4 text-[0.8rem] font-medium tracking-[0.18em] uppercase transition-colors";
export const btn = {
  solid: `${base} bg-black text-white hover:bg-gray-800`,
  outline: `${base} border border-black text-black hover:bg-black hover:text-white`,
  light: `${base} bg-white text-black hover:bg-gray-200`,
  ghostLight: `${base} border border-white text-white hover:bg-white hover:text-black`,
};

export const eyebrow = "text-[0.75rem] tracking-[0.2em] uppercase text-gray-600";
export const wrap = "max-w-7xl mx-auto px-6 lg:px-12";
export const sectionPad = "py-20 md:py-24";

/** A button that is a router Link for internal paths and an <a> otherwise. */
export function Btn({ to, href, variant = "solid", children, ...rest }) {
  if (to) return <Link to={to} className={btn[variant]} {...rest}>{children}</Link>;
  return <a href={href} className={btn[variant]} {...rest}>{children}</a>;
}

/** Photo hero with dark overlay; content sits at the bottom, centred. */
export function PageHero({ image, alt, kicker, title, subtitle, children }) {
  return (
    <section className="relative h-[70vh] min-h-[480px] max-h-[760px] bg-black">
      <img src={image} alt={alt} fetchpriority="high" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-end text-center text-white px-6 pb-16 md:pb-20 gap-6">
        {kicker && <p className="text-[0.75rem] tracking-[0.2em] uppercase text-gray-200">{kicker}</p>}
        <h1 className="text-[2.1rem] sm:text-5xl lg:text-7xl">{title}</h1>
        {subtitle && <p className="text-base md:text-lg tracking-wide max-w-xl">{subtitle}</p>}
        {children && <div className="flex flex-col sm:flex-row gap-3">{children}</div>}
      </div>
    </section>
  );
}

export function SectionTitle({ title, sub, light = false }) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-2xl md:text-4xl">{title}</h2>
      {sub && <p className={`mt-3 ${light ? "text-gray-300" : "text-gray-600"}`}>{sub}</p>}
    </div>
  );
}

/** Row of big light numbers with small caps labels. */
export function Stats({ items, bordered = true }) {
  return (
    <section className={bordered ? "border-b border-gray-200" : ""}>
      <dl
        className={`${wrap} py-12 grid grid-cols-2 ${
          { 2: "md:grid-cols-2", 3: "md:grid-cols-3" }[items.length] || "md:grid-cols-4"
        } gap-8 text-center`}
      >
        {items.map(([n, label]) => (
          <div key={label} className="flex flex-col-reverse gap-1">
            <dt className="text-[0.75rem] tracking-[0.18em] uppercase text-gray-600">{label}</dt>
            <dd className="text-3xl md:text-4xl font-light tracking-[0.06em]">{n}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/** Numbered list of features with a rule above each — replaces icon cards. */
export function FeatureList({ items, cols = 4 }) {
  const grid = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "grid-cols-2 lg:grid-cols-4" }[cols];
  return (
    <ol className={`grid ${grid} gap-x-8 gap-y-10`}>
      {items.map(([title, desc], i) => (
        <li key={title} className="border-t border-black pt-5">
          <span className="text-sm text-gray-500">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-2 text-[0.95rem] font-medium tracking-[0.12em]">{title}</h3>
          {desc && <p className="mt-2 text-sm text-gray-600">{desc}</p>}
        </li>
      ))}
    </ol>
  );
}

/** Black closing band with a heading and buttons. */
export function CtaBand({ kicker, title, text, children }) {
  return (
    <section className="bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-20 md:py-24 text-center flex flex-col items-center gap-6">
        {kicker && <p className="text-[0.75rem] tracking-[0.2em] uppercase text-gray-400">{kicker}</p>}
        <h2 className="text-3xl md:text-5xl font-light">{title}</h2>
        {text && <p className="text-gray-300 max-w-2xl">{text}</p>}
        {children && <div className="flex flex-col sm:flex-row gap-3">{children}</div>}
      </div>
    </section>
  );
}

/** Image beside text, editorial split. */
export function Split({ image, alt, reverse = false, children, aspect = "aspect-[4/5]" }) {
  return (
    <section className={`${wrap} ${sectionPad} grid gap-12 md:grid-cols-2 items-center`}>
      <img
        src={image}
        alt={alt}
        loading="lazy"
        className={`w-full ${aspect} object-cover ${reverse ? "md:order-2" : ""}`}
      />
      <div className="flex flex-col gap-6">{children}</div>
    </section>
  );
}

export const inputCls =
  "w-full border border-gray-300 bg-white px-4 py-3 text-base text-black placeholder:text-gray-500 focus:border-black focus:outline-none";
export const labelCls = "block text-[0.75rem] font-medium tracking-[0.16em] uppercase mb-2";
