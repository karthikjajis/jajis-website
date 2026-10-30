import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import Logo from "../assets/img/images-logo.webp";

const columns = [
  {
    title: "Book",
    links: [
      ["Find a salon", "/salons"],
      ["Q Café & Event Hall", "/event-hall"],
      ["Food Court", "/food-court"],
    ],
  },
  {
    title: "Buy",
    links: [
      ["Shop all products", "/products"],
      ["Cosmetics", "/cosmetics"],
      ["My orders", "/myorders"],
      ["Wishlist", "/wishlist"],
    ],
  },
  {
    title: "Learn",
    links: [
      ["Jaji’s Academy", "/academy"],
      ["Designing & Stitching", "/designing-stitching"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About us", "/about-us"],
      ["Management", "/management"],
      ["Franchise", "/franchise"],
      ["Contact", "/contact"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 text-sm pb-24 md:pb-0">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="text-white text-[0.8rem] font-medium tracking-[0.18em] mb-5">{col.title}</h2>
              <ul className="space-y-3">
                {col.links.map(([label, path]) => (
                  <li key={path}>
                    <Link to={path} className="hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-gray-800 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
          <div className="flex items-center gap-6">
            <img src={Logo} alt="Jaji's Innovation" className="h-10 w-auto brightness-0 invert" loading="lazy" />
            <div className="flex gap-5 text-white">
              <a href="https://www.instagram.com/jajisgroup" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-70"><FaInstagram className="w-4 h-4" /></a>
              <a href="https://www.facebook.com/share/1DPhDM11zx/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:opacity-70"><FaFacebookF className="w-4 h-4" /></a>
              <a href="https://youtube.com/@jajisunil" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:opacity-70"><FaYoutube className="w-4 h-4" /></a>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/privacy" className="hover:text-white">Privacy policy</Link>
            <Link to="/terms" className="hover:text-white">Terms of service</Link>
            <span>© {new Date().getFullYear()} Jaji’s Innovation Pvt. Ltd.</span>
          </div>
        </div>
        <p className="mt-6 text-xs text-gray-600">
          <a href="https://www.inspirezesttechnologies.com/" className="hover:text-gray-400">
            Developed by InspireZest Technologies Pvt Ltd
          </a>
        </p>
      </div>
    </footer>
  );
}
