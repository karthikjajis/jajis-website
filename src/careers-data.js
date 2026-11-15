// Shared by the careers pages (browser) and the build-time pre-renderer.
// Turns a job from the API into Google "JobPosting" structured data so it can appear in Google's Jobs box.
const SITE = "https://www.jajisinnovation.com";

export const EMPLOYMENT_LABEL = {
  FULL_TIME: "Full-time", PART_TIME: "Part-time", INTERN: "Internship", CONTRACTOR: "Contract", TEMPORARY: "Temporary",
};

// Street addresses for each branch a job can be at (Google needs a real address for the job).
export const BRANCH_ADDRESS = {
  "RP Mall, Kollam": ["4th Floor, RP Mall, Taluk Kachery", "Kollam", "691001"],
  "Polayathodu, Kollam": ["1st Floor, Narayaneeyam, Near KFC, Polayathodu", "Kollam", "691010"],
  Karunagappally: ["2nd Floor, KC Center, Near KSRTC Bus Stand", "Karunagappally", "690518"],
  Sasthamcotta: ["Vijaya Tower, Adhikadu Junction, Chavara–Sasthamcotta Road", "Sasthamcotta", "690521"],
  Paravur: ["Kottuvankonam", "Paravur", "691301"],
  "Vazhuthacaud, Trivandrum": ["Ground Floor, KEK Tower, Opposite Trivandrum Club, Vazhuthacaud", "Thiruvananthapuram", "695010"],
  "Head Office, Kollam": ["", "Kollam", ""],
  "Q Café & Event Hall, Kollam": ["Near Children's Park, Asramam", "Kollam", "691002"],
  "Food Court, Kollam": ["Ashramam Maidanam", "Kollam", "691002"],
  "Designing & Stitching Studio, Polayathodu": ["Opposite KFC, Polayathodu", "Kollam", "691010"],
  "Jaji's Academy, Polayathodu": ["1st Floor, Narayaneeyam, Near KFC, Polayathodu", "Kollam", "691010"],
};

export const jobSlug = (job) =>
  `${job.id}-${String(job.title).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60)}`;

export const rupees = (n) => `₹${Number(n).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
export function salaryText(job) {
  const a = job.salary_min, b = job.salary_max;
  if (a && b && a !== b) return `${rupees(a)} – ${rupees(b)} a month`;
  if (a || b) return `${rupees(a || b)} a month`;
  return "";
}

const escHtml = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/** Plain-text description (blank lines = paragraphs, "-" or "•" lines = bullet lists) -> simple HTML. */
export function descriptionHtml(text) {
  return String(text ?? "")
    .split(/\n{2,}/)
    .map((block) => {
      const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
      if (lines.length && lines.every((l) => /^[-•*]\s*/.test(l)))
        return `<ul>${lines.map((l) => `<li>${escHtml(l.replace(/^[-•*]\s*/, ""))}</li>`).join("")}</ul>`;
      return `<p>${lines.map(escHtml).join("<br>")}</p>`;
    })
    .join("");
}

export function jobPostingLd(job) {
  const [street, city, pin] = BRANCH_ADDRESS[job.branch] || ["", "Kollam", ""];
  const extra = [
    job.experience && `<p><b>Experience:</b> ${escHtml(job.experience)}</p>`,
    `<p><b>Location:</b> Jaji's ${escHtml(job.branch)}, Kerala</p>`,
    `<p>Apply online at ${SITE}/careers/${jobSlug(job)}</p>`,
  ].filter(Boolean).join("");
  const ld = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: job.title,
    description: descriptionHtml(job.description) + extra,
    identifier: { "@type": "PropertyValue", name: "Jaji's Innovation", value: `JAJIS-JOB-${job.id}` },
    datePosted: String(job.posted_at || new Date().toISOString()).slice(0, 10),
    employmentType: job.employment_type || "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "Jaji's Innovation Pvt. Ltd.",
      sameAs: SITE,
      logo: `${SITE}/logo.png`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        ...(street ? { streetAddress: street } : {}),
        addressLocality: city,
        addressRegion: "Kerala",
        ...(pin ? { postalCode: pin } : {}),
        addressCountry: "IN",
      },
    },
    directApply: true,
    url: `${SITE}/careers/${jobSlug(job)}`,
  };
  if (job.valid_through) ld.validThrough = `${job.valid_through}T23:59`;
  if (job.salary_min || job.salary_max) {
    ld.baseSalary = {
      "@type": "MonetaryAmount",
      currency: "INR",
      value: {
        "@type": "QuantitativeValue",
        ...(job.salary_min && job.salary_max && job.salary_min !== job.salary_max
          ? { minValue: job.salary_min, maxValue: job.salary_max }
          : { value: job.salary_min || job.salary_max }),
        unitText: "MONTH",
      },
    };
  }
  return ld;
}
