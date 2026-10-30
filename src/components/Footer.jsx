import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const places = [
  ["Kollam, RP Mall", "+91 98479 48242", "+919847948242"],
  ["Karunagappally", "+91 70346 24625", "+917034624625"],
  ["Trivandrum", "+91 92072 09207", "+919207209207"],
  ["Customer care", "+91 98470 24347", "+919847024347"],
];

const columns = [
  [
    ["Find a salon", "/salons"],
    ["Book the Q Café hall", "https://jajisqcafe.com/book"],
    ["Q Café & Event Hall", "/event-hall"],
    ["Food Court", "/food-court"],
  ],
  [
    ["Shop all products", "/products"],
    ["Cosmetics", "/cosmetics"],
    ["My orders", "/myorders"],
    ["Wishlist", "/wishlist"],
  ],
  [
    ["Jaji’s Academy", "/academy"],
    ["Designing & Stitching", "/designing-stitching"],
    ["Franchise", "/franchise"],
    ["About us", "/about-us"],
    ["Management", "/management"],
    ["Contact", "/contact"],
  ],
];

const pad = "px-[clamp(16px,2.2vw,32px)]";

export default function Footer() {
  return (
    <footer className="bg-[#efedea] text-black pb-24 md:pb-0 overflow-hidden">
      <div className={`${pad} pt-[clamp(64px,8vw,120px)]`}>
        <h2
          className="!normal-case !tracking-[-0.045em] !font-semibold !leading-[0.8] pl-[0.03em] text-[clamp(96px,21vw,380px)]"
          aria-label="Jaji's Innovation"
        >
          Jaji’s
        </h2>

        <div className="mt-[clamp(72px,7vw,112px)] grid gap-12 md:grid-cols-12">
          <ul className="md:col-span-6 flex flex-col gap-4">
            {places.map(([place, phone, tel]) => (
              <li key={place}>
                <a href={`tel:${tel}`} className="group block">
                  <span className="block text-[15px] text-[#4d4d4d]">{place}</span>
                  <span className="block text-[24px] font-medium tracking-[-0.01em] group-hover:underline underline-offset-[6px] decoration-1">
                    {phone}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <nav aria-label="Footer" className="md:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8 text-[15px]">
            {columns.map((col, i) => (
              <ul key={i} className="flex flex-col gap-3">
                {col.map(([label, path]) => (
                  <li key={path}>
                    {path.startsWith("http") ? (
                      <a href={path} className="hover:underline underline-offset-4">
                        {label}
                      </a>
                    ) : (
                      <Link to={path} className="hover:underline underline-offset-4">
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            ))}
          </nav>
        </div>

        <div className="mt-24 pb-10 flex flex-col md:flex-row gap-6 md:items-center md:justify-between text-[15px] text-[#4d4d4d]">
          <div className="flex items-center gap-6 text-black">
            <a href="https://www.instagram.com/jajisgroup" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-60">
              <FaInstagram className="w-5 h-5" />
            </a>
            <a href="https://www.facebook.com/share/1DPhDM11zx/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:opacity-60">
              <FaFacebookF className="w-5 h-5" />
            </a>
            <a href="https://youtube.com/@jajisunil" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:opacity-60">
              <FaYoutube className="w-5 h-5" />
            </a>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <span>© {new Date().getFullYear()} Jaji’s Innovation Pvt. Ltd.</span>
            <Link to="/privacy" className="hover:text-black">
              Privacy policy
            </Link>
            <Link to="/terms" className="hover:text-black">
              Terms of service
            </Link>
            <a href="#top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-black">
              Back to top
            </a>
            <a href="https://www.inspirezesttechnologies.com/" className="hover:text-black">
              Developed by InspireZest Technologies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
