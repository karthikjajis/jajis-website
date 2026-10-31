// After `vite build`, write real HTML for every public page and product so search
// engines (and link previews) see content, titles and structured data without
// running JavaScript. The React app still loads and takes over in the browser.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
const ssr = await import(pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href);
const { render, renderProduct, ROUTES, PAGE_SEO } = ssr;
const biz = await import(pathToFileURL(path.join(root, "src", "business-data.js")).href);

const SITE = "https://www.jajisinnovation.com";
const API = (process.env.VITE_API_URL || "https://tbkvtcuqszgmahzswspe.supabase.co/functions/v1/api/").replace(/\/?$/, "/");
const DEFAULT_TITLE = "Jaji's Innovation | Salons, Academy & Beauty Products in Kerala";
const DEFAULT_DESC =
  "Jaji's — Kerala's family salon brand since 2002. Salons, academy, Jaji's Research skin and hair care, Q Café & Event Hall, Food Court and Designing & Stitching studio in Kollam.";
const DEFAULT_IMAGE = `${SITE}/house-of-jajis-og.jpg`;

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const ld = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`;

function page({ url, title, description, image, type = "website", body, jsonLd = [] }) {
  const fullTitle = title ? `${title} | Jaji's Innovation` : DEFAULT_TITLE;
  const desc = (description || DEFAULT_DESC).replace(/\s+/g, " ").trim().slice(0, 300);
  const canonical = `${SITE}${url}`;
  const head = [
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:site_name" content="Jaji's Innovation" />`,
    `<meta property="og:image" content="${esc(image || DEFAULT_IMAGE)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    ld(biz.ORGANIZATION),
    ld(biz.WEBSITE),
    ...jsonLd.map(ld),
  ].join("\n  ");

  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(fullTitle)}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${esc(desc)}" />`)
    .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(fullTitle)}" />`)
    .replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${esc(desc)}" />`)
    .replace(/<meta property="og:type"[^>]*>/, `<meta property="og:type" content="${type}" />`)
    .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${canonical}" />`)
    .replace("</head>", `  ${head}\n</head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}

function write(url, html) {
  // "/salons" -> dist/salons.html; Vercel's cleanUrls serves it at /salons
  const file = url === "/" ? path.join(dist, "index.html") : path.join(dist, `${url.replace(/^\//, "")}.html`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

// ---- static pages
let count = 0;
for (const url of ROUTES) {
  const seo = PAGE_SEO[url] || {};
  write(url, page({ url, ...seo, body: render(url), jsonLd: [].concat(biz.PAGE_LD[url] || []) }));
  count++;
}
// /refund-policy shows the same page as /return-policy
write("/refund-policy", page({ url: "/return-policy", ...PAGE_SEO["/return-policy"], body: render("/return-policy") }));

// ---- products (fetched live from the shop at build time)
const rupees = (n) => `₹${Number(n).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
const brandName = (b) => (!b || /^jajis?'?s?$/i.test(String(b).trim()) ? "Jaji's" : String(b).trim());

async function getJson(p) {
  const r = await fetch(API + p, { headers: { accept: "application/json" } });
  if (!r.ok) throw new Error(`${p}: HTTP ${r.status}`);
  return r.json();
}

let products = [];
try {
  products = (await getJson("products/")).products || [];
} catch (e) {
  console.warn(`[prerender] products skipped (${e.message}) — product pages will render in the browser only`);
}

const productLinks = [];
for (const p of products) {
  let d = p;
  try {
    d = await getJson(`products/${p.id}/`);
  } catch {
    /* fall back to list data */
  }
  const url = `/product/${p.id}`;
  const variants = Array.isArray(d.variants) ? d.variants : [];
  const images = [d.image1, d.image2, d.image3, d.image4].filter(Boolean);
  const v = variants[0];
  const brand = brandName(d.brand);
  productLinks.push(`<li><a href="${url}">${esc(d.title)}</a></li>`);

  const inner = `
<article class="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid gap-12 md:grid-cols-2">
  ${images[0] ? `<img src="${esc(images[0])}" alt="${esc(d.title)}" class="w-full aspect-square object-contain bg-gray-100" />` : ""}
  <div class="flex flex-col gap-4">
    <p class="text-[0.75rem] tracking-[0.2em] uppercase text-gray-600">${esc(brand)}${d.category_name ? ` · ${esc(d.category_name)}` : ""}</p>
    <h1 class="text-3xl md:text-4xl font-light">${esc(d.title)}</h1>
    ${v ? `<p class="text-xl">${rupees(v.price)}${Number(v.mrp) > Number(v.price) ? ` <s class="text-gray-500">${rupees(v.mrp)}</s>` : ""}${v.quantity_label ? ` · ${esc(v.quantity_label)}` : ""}</p>` : ""}
    ${d.description ? `<p class="text-gray-700 leading-relaxed">${esc(d.description)}</p>` : ""}
    <p><a href="/products" class="underline">Shop all Jaji's products</a></p>
  </div>
</article>`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: d.title,
      description: d.description || d.title,
      image: images,
      brand: { "@type": "Brand", name: brand },
      sku: String(v?.sku || `JAJIS-${v?.id ?? p.id}`),
      url: `${SITE}${url}`,
      offers: variants.map((x) => ({
        "@type": "Offer",
        url: `${SITE}${url}`,
        priceCurrency: "INR",
        price: Number(x.price).toFixed(2),
        availability: Number(x.stock) > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        itemCondition: "https://schema.org/NewCondition",
        seller: { "@id": `${SITE}/#organization` },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Shop", item: `${SITE}/products` },
        { "@type": "ListItem", position: 3, name: d.title, item: `${SITE}${url}` },
      ],
    },
  ];

  write(
    url,
    page({
      url,
      title: `${d.title}${v?.quantity_label ? ` (${v.quantity_label})` : ""} – Buy online`,
      description: `${d.title} by ${brand}${v ? ` — ${rupees(v.price)}` : ""}. ${d.description || ""}`,
      image: images[0],
      type: "product",
      body: renderProduct(url, inner),
      jsonLd,
    }),
  );
  count++;
}

// ---- shop listing page with links to every product (helps Google find them)
const shopInner = `
<section class="max-w-7xl mx-auto px-6 lg:px-12 py-16">
  <h1 class="text-2xl md:text-4xl text-center mb-8">Shop hair &amp; skin care</h1>
  <ul class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">${productLinks.join("")}</ul>
</section>`;
write(
  "/products",
  page({ url: "/products", ...PAGE_SEO["/products"], body: renderProduct("/products", shopInner) }),
);
count++;

console.log(`[prerender] wrote ${count} pages (${products.length} products)`);
