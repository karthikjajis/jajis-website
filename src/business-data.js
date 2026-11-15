// Structured data (schema.org) describing Jaji's as a business, for Google.
// Salon details checked against each salon's Google Maps listing (Oct 2026).
export const SITE = "https://www.jajisinnovation.com";
const LOGO = `${SITE}/logo.png`;

const daily = (opens, closes) => [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens,
    closes,
  },
];

export const ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE}/#organization`,
  name: "Jaji's Innovation Pvt. Ltd.",
  alternateName: ["Jaji's", "Jajis", "Jajis Innovation", "Jaji's Group"],
  url: SITE,
  logo: LOGO,
  foundingDate: "2002",
  founder: { "@type": "Person", name: "Dr. Jajimole K" },
  email: "jajisinnovation@gmail.com",
  telephone: "+91 97440 12345",
  address: { "@type": "PostalAddress", addressLocality: "Kollam", addressRegion: "Kerala", addressCountry: "IN" },
  sameAs: [
    "https://www.instagram.com/jajisgroup",
    "https://www.facebook.com/share/1DPhDM11zx/",
    "https://youtube.com/@jajisunil",
  ],
};

export const WEBSITE = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  url: SITE,
  name: "Jaji's Innovation",
  publisher: { "@id": `${SITE}/#organization` },
};

const SALONS = [
  ["rp-mall-kollam", "Jaji's Innovation Unisex Beauty Salon & Bride/Groom Makeover Studio – RP Mall, Kollam", "4th Floor, RP Mall, Taluk Kachery", "Kollam", "691001", "+91 98479 48242", 8.889425, 76.585812, "10:00", "21:00"],
  ["polayathodu-kollam", "Jaji's Express Family Salon & Bride/Groom Lounge – Polayathodu, Kollam", "1st Floor, Narayaneeyam, Near KFC, Polayathodu", "Kollam", "691010", "+91 97440 12345", 8.8792292, 76.6071918, "09:00", "21:00"],
  ["karunagappally", "Jaji's Innovation Unisex Beauty Salon – Karunagappally", "2nd Floor, KC Center, Opp. Boys Higher Secondary School, Near KSRTC Bus Stand", "Karunagappally", "690518", "+91 88933 88090", 9.0592921, 76.5358352, "10:00", "21:00"],
  ["sasthamcotta", "Jaji's Innovation Unisex Beauty Salon & Bridal Makeup Studio – Sasthamcotta", "Vijaya Tower, Adhikadu Junction, Chavara–Sasthamcotta Road", "Sasthamcotta", "690521", "+91 94477 19988", 9.0294422, 76.6120031, "10:00", "20:00"],
  ["paravur", "Jaji's Innovation Unisex Beauty Salon & Bridal Makeup Studio – Paravur", "Kottuvankonam", "Paravur", "691301", "+91 96332 10449", 8.8121822, 76.687411, "10:00", "21:00"],
  ["vazhuthacaud-trivandrum", "Jaji's Innovation Unisex Beauty Salon & Bridal Makeup Studio – Vazhuthacaud, Trivandrum", "Ground Floor, KEK Tower, Opposite Trivandrum Club, Nandavanam, Vazhuthacaud", "Thiruvananthapuram", "695010", "+91 92072 09207", 8.5060777, 76.9611105, "10:00", "21:00"],
];

export const SALON_LD = SALONS.map(([slug, name, street, city, pin, phone, lat, lng, opens, closes]) => ({
  "@context": "https://schema.org",
  "@type": ["HairSalon", "BeautySalon"],
  "@id": `${SITE}/salons#${slug}`,
  name,
  url: ["rp-mall-kollam", "polayathodu-kollam"].includes(slug) ? `${SITE}/kollam` : `${SITE}/salons`,
  image: LOGO,
  telephone: phone,
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: street,
    addressLocality: city,
    addressRegion: "Kerala",
    postalCode: pin,
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: lat, longitude: lng },
  openingHoursSpecification: daily(opens, closes),
  parentOrganization: { "@id": `${SITE}/#organization` },
  hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name}, ${city}`)}`,
}));

export const EVENT_VENUE_LD = {
  "@context": "https://schema.org",
  "@type": ["EventVenue", "CafeOrCoffeeShop"],
  name: "Jaji's Q Café & Event Hall",
  url: `${SITE}/event-hall`,
  telephone: "+91 70346 26625",
  maximumAttendeeCapacity: 400,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Near Children's Park, Asramam",
    addressLocality: "Kollam",
    addressRegion: "Kerala",
    postalCode: "691001",
    addressCountry: "IN",
  },
  parentOrganization: { "@id": `${SITE}/#organization` },
};

export const FOOD_COURT_LD = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  name: "Jaji's Food Court",
  url: `${SITE}/food-court`,
  telephone: "+91 70346 26627",
  servesCuisine: ["South Indian", "Chinese", "Juices", "Tea"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ashramam Maidanam",
    addressLocality: "Kollam",
    addressRegion: "Kerala",
    postalCode: "691001",
    addressCountry: "IN",
  },
  parentOrganization: { "@id": `${SITE}/#organization` },
};

export const STUDIO_LD = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: "Jaji's Designing & Stitching Studio",
  url: `${SITE}/designing-stitching`,
  telephone: "+91 96452 96450",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Opposite KFC, Polayathodu",
    addressLocality: "Kollam",
    addressRegion: "Kerala",
    postalCode: "691021",
    addressCountry: "IN",
  },
  parentOrganization: { "@id": `${SITE}/#organization` },
};

export const ACADEMY_LD = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Jaji's Beauty Academy",
  url: `${SITE}/academy`,
  telephone: "+91 97440 12345",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1st Floor, Narayaneeyam, Near KFC, Polayathodu",
    addressLocality: "Kollam",
    addressRegion: "Kerala",
    postalCode: "691021",
    addressCountry: "IN",
  },
  parentOrganization: { "@id": `${SITE}/#organization` },
};


// Questions people search for; shown on the Salons page and marked up for Google.
export const SALON_FAQ = [
  [
    "Where are Jaji's salons?",
    "Jaji's has salons at RP Mall (Kollam), Polayathodu (Kollam), Karunagappally, Sasthamcotta, Paravur and Vazhuthacaud (Thiruvananthapuram). Each salon's address, phone number and directions are listed on this page.",
  ],
  [
    "Do you do bridal makeup in Kollam?",
    "Yes. Our bridal makeup studios and bride/groom makeover studios in Kollam, Sasthamcotta, Paravur and Trivandrum offer bridal makeup, hair styling and pre-wedding packages for brides and grooms.",
  ],
  [
    "Are Jaji's salons unisex?",
    "Yes. Jaji's Innovation salons are unisex family salons offering hair, skin, spa and grooming services for women, men and children.",
  ],
  [
    "Are you open on Sundays?",
    "Yes, our salons are open every day. Most are open from 10 AM to 9 PM; Polayathodu opens at 9 AM and Sasthamcotta closes at 8 PM.",
  ],
  [
    "How do I book an appointment?",
    "Call or WhatsApp your nearest salon using the numbers on this page, or contact us through the Contact page.",
  ],
];

export const SALON_FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: SALON_FAQ.map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

/** Which structured data goes on which page (Organization + WebSite go everywhere). */
export const KOLLAM_FAQ = [
  [
    "Which is the best salon in Kollam?",
    "Jaji's Innovation has been Kollam's family salon since 2002. Our RP Mall and Polayathodu salons are rated 4.6 on Google by more than 8,400 guests, and offer hair, skin, spa and bridal services under one roof.",
  ],
  [
    "Where are Jaji's salons in Kollam?",
    "Jaji's Innovation is on the 4th floor of RP Mall, Taluk Kachery, Kollam, and Jaji's Express Family Salon is on the 1st floor of Narayaneeyam, near KFC, Polayathodu. We also have salons at Karunagappally, Sasthamcotta and Paravur.",
  ],
  [
    "Is Jaji's a unisex salon?",
    "Yes. Jaji's salons in Kollam are unisex family salons for women, men and children, with bride and groom makeover studios.",
  ],
  [
    "Can I book a salon appointment online in Kollam?",
    "Yes. Choose RP Mall or Polayathodu at jajisinnovation.com/book, pick your service and a free time, and pay at the salon. You can also call or walk in.",
  ],
  [
    "Do you do bridal makeup in Kollam?",
    "Yes. Our bride and groom studios at RP Mall and Polayathodu offer bridal makeup, hairstyling, saree draping and pre-wedding skin and hair care. Call the salon to plan your look and trial.",
  ],
  [
    "What are the opening hours of Jaji's salons in Kollam?",
    "Both Kollam salons are open every day. RP Mall is open 10 AM to 9 PM and Polayathodu 9 AM to 9 PM.",
  ],
];

export const KOLLAM_FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: KOLLAM_FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

const KOLLAM_BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Salons", item: `${SITE}/salons` },
    { "@type": "ListItem", position: 3, name: "Salons in Kollam", item: `${SITE}/kollam` },
  ],
};

export const PAGE_LD = {
  "/": SALON_LD,
  "/salons": [...SALON_LD, SALON_FAQ_LD],
  "/kollam": [...SALON_LD.slice(0, 2), KOLLAM_FAQ_LD, KOLLAM_BREADCRUMB_LD],
  "/contact": [...SALON_LD, EVENT_VENUE_LD, FOOD_COURT_LD, STUDIO_LD, ACADEMY_LD],
  "/event-hall": [EVENT_VENUE_LD],
  "/food-court": [FOOD_COURT_LD],
  "/designing-stitching": [STUDIO_LD],
  "/academy": [ACADEMY_LD],
};
