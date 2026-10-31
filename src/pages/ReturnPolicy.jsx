import { Link } from "react-router-dom";

const UPDATED = "31 October 2026";
const PHONE = "+91 97440 12345";
const EMAIL = "jajisinnovation@gmail.com";

function Section({ title, children }) {
  return (
    <section className="border-t border-gray-200 py-8">
      <h2 className="text-[1rem] font-medium tracking-[0.14em] mb-4">{title}</h2>
      <div className="flex flex-col gap-3 text-gray-700 leading-relaxed">{children}</div>
    </section>
  );
}

export default function ReturnPolicy() {
  return (
    <div className="bg-white text-black pt-24">
      <article className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <p className="text-[0.75rem] tracking-[0.2em] uppercase text-gray-600">Shop policies</p>
        <h1 className="mt-3 text-3xl md:text-5xl font-light">Return &amp; refund policy</h1>
        <p className="mt-4 text-sm text-gray-600">Last updated: {UPDATED}</p>

        <p className="mt-8 text-gray-700 leading-relaxed">
          This policy applies to products bought on www.jajisinnovation.com from Jaji’s Innovation Pvt. Ltd.
        </p>

        <div className="mt-8">
          <Section title="No returns or exchanges">
            <p>
              Because our products are personal care and cosmetic items, <strong className="font-medium text-black">we do
              not accept returns or exchanges</strong> once an order has been delivered. This is for hygiene and safety
              reasons — opened or used products cannot be resold.
            </p>
            <p>We do not offer refunds for change of mind, wrong shade or size chosen, or products that have been opened or used.</p>
          </Section>

          <Section title="Damaged, defective or wrong items">
            <p>
              If your order arrives damaged, leaking, defective or is not the product you ordered, please contact us
              within <strong className="font-medium text-black">48 hours of delivery</strong> with your order number and
              clear photos of the product and packaging.
            </p>
            <p>
              After checking, we will send a replacement at no extra cost or, if a replacement is not available, give you
              a full refund. You do not need to send the item back unless we ask you to.
            </p>
          </Section>

          <Section title="Order cancellations">
            <p>
              You can cancel an order before it is dispatched by calling or WhatsApping us. Once an order has been
              dispatched, it cannot be cancelled.
            </p>
          </Section>

          <Section title="Refunds">
            <p>
              Approved refunds are made to the original payment method within 5–7 business days. Your bank may take a few
              extra days to show the amount in your account.
            </p>
          </Section>

          <Section title="Contact us">
            <p>Jaji’s Innovation Pvt. Ltd., Kollam, Kerala</p>
            <p>
              Phone / WhatsApp:{" "}
              <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="underline underline-offset-4">{PHONE}</a>
            </p>
            <p>
              Email: <a href={`mailto:${EMAIL}`} className="underline underline-offset-4">{EMAIL}</a>
            </p>
            <p>
              See also our <Link to="/terms" className="underline underline-offset-4">terms of service</Link> and{" "}
              <Link to="/privacy" className="underline underline-offset-4">privacy policy</Link>.
            </p>
          </Section>
        </div>
      </article>
    </div>
  );
}
