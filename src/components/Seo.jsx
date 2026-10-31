import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE = "https://www.jajisinnovation.com";
const DEFAULT_TITLE = "Jaji's Innovation | Salons, Academy & Beauty Products in Kerala";
const DEFAULT_DESC =
  "Jaji's — Kerala's family salon brand since 2002. Salons, academy, Jaji's Research skin and hair care, Q Café & Event Hall, Food Court and Designing & Stitching studio in Kollam.";

function setMeta(attr, key, value) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Sets the page title, description, canonical URL and social tags, and optionally
 * a JSON-LD block (e.g. schema.org Product) so Google understands the page.
 */
export default function Seo({ title, description, image, type = "website", jsonLd }) {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = title ? `${title} | Jaji's Innovation` : DEFAULT_TITLE;
    const desc = (description || DEFAULT_DESC).replace(/\s+/g, " ").trim().slice(0, 300);
    const url = `${SITE}${pathname}`;
    document.title = fullTitle;
    setMeta("name", "description", desc);
    setCanonical(url);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", desc);
    setMeta("property", "og:url", url);
    setMeta("property", "og:type", type);
    if (image) setMeta("property", "og:image", image);

    let script;
    if (jsonLd) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.seo = "page";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
    return () => {
      if (script) script.remove();
    };
  }, [title, description, image, type, pathname, jsonLd]);

  return null;
}

/** schema.org Product + offers for a product from the shop API. */
export function productJsonLd(product, id) {
  if (!product) return null;
  const images = [product.image1, product.image2, product.image3, product.image4].filter(Boolean);
  const brand = !product.brand || /^jajis?'?s?$/i.test(product.brand.trim()) ? "Jaji's" : product.brand.trim();
  const url = `${SITE}/product/${id}`;
  const variants = Array.isArray(product.variants) ? product.variants : [];
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description || product.title,
    image: images,
    brand: { "@type": "Brand", name: brand },
    sku: String(variants[0]?.sku || `JAJIS-${variants[0]?.id ?? id}`),
    url,
    offers: variants.map((v) => ({
      "@type": "Offer",
      url,
      priceCurrency: "INR",
      price: Number(v.price).toFixed(2),
      availability: Number(v.stock) > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      sku: String(v.sku || `JAJIS-${v.id}`),
      name: v.quantity_label ? `${product.title} – ${v.quantity_label}` : product.title,
      seller: { "@type": "Organization", name: "Jaji's Innovation" },
    })),
  };
}
