import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag, Heart, User, Home, Store } from "lucide-react";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import logo from "../assets/img/images-logo.webp";

const menuItems = [
  { path: "/", label: "Home" },
  { path: "/products", label: "Shop online" },
  { path: "/salons", label: "Salons" },
  { path: "/cosmetics", label: "Cosmetics" },
  { path: "/academy", label: "Academy" },
  { path: "/event-hall", label: "Q Café & Event Hall" },
  { path: "/food-court", label: "Food Court" },
  { path: "/designing-stitching", label: "Designing & Stitching" },
  { path: "/franchise", label: "Franchise" },
  { path: "/management", label: "Management" },
  { path: "/about-us", label: "About us" },
  { path: "/contact", label: "Contact" },
];

const desktopLinks = [
  { path: "/salons", label: "Salons" },
  { path: "/products", label: "Shop" },
  { path: "/academy", label: "Academy" },
  { path: "/event-hall", label: "Book a hall" },
];

const caps = "text-[16px] font-medium";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem("token");

  // The phone's bottom bar steps aside while reading down and returns on the way back up.
  const [barHidden, setBarHidden] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 8) return;
      setBarHidden(y > last && y > 200);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu whenever the page changes, and stop the page scrolling behind it.
  useEffect(() => setIsOpen(false), [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  const linkClass = ({ isActive }) =>
    `text-[17px] py-2 underline-offset-[6px] decoration-1 hover:underline ${isActive ? "underline" : ""}`;

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white">
        <div className="h-20 px-[clamp(16px,2.2vw,32px)] flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setIsOpen(true)} aria-label="Open menu" className="p-2 -ml-2">
              <Menu className="w-6 h-6" strokeWidth={1.5} />
            </button>
            <Link to="/" aria-label="Jaji's home">
              <img src={logo} alt="Jaji's Innovation" className="h-12 w-auto" width="120" height="48" />
            </Link>
          </div>

          <div className="flex items-center gap-7">
            <nav aria-label="Main" className="hidden lg:flex items-center gap-7">
              {desktopLinks.map((l) => (
                <NavLink key={l.path} to={l.path} className={linkClass}>
                  {l.label}
                </NavLink>
              ))}
            </nav>
            <NavLink
              to={isAuthenticated ? "/profile" : "/login"}
              className={(s) => `${linkClass(s)} hidden md:block`}
            >
              {isAuthenticated ? "Account" : "Log in"}
            </NavLink>
            <NavLink to="/cart" className={linkClass} aria-label="Cart">
              <span className="hidden md:inline">Cart</span>
              <ShoppingBag className="w-5 h-5 md:hidden" strokeWidth={1.5} />
            </NavLink>
            <Link
              to="/salons"
              className="hidden sm:inline-flex items-center min-h-11 px-5 bg-black text-white text-[17px] font-medium hover:bg-[#2b2b2b] active:scale-[0.97] transition-[background-color,transform] duration-150"
            >
              Book a salon
            </Link>
          </div>
        </div>
      </header>

      {/* Full-screen menu */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!isOpen}
        className="fixed inset-0 bg-white z-[100] overflow-y-auto"
      >
        <div className="h-20 px-[clamp(16px,2.2vw,32px)] flex items-center justify-between">
          <img src={logo} alt="" className="h-10 w-auto" />
          <button type="button" onClick={() => setIsOpen(false)} aria-label="Close menu" className="p-2 -mr-2">
            <X className="w-6 h-6" strokeWidth={1.5} />
          </button>
        </div>

        <nav aria-label="All pages" className="max-w-3xl mx-auto px-6 py-12 grid sm:grid-cols-2 gap-x-12">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={({ isActive }) =>
                `py-3 text-[clamp(24px,3vw,32px)] tracking-[-0.01em] ${
                  isActive ? "font-medium underline underline-offset-8 decoration-1" : "hover:translate-x-2 transition-transform"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="sm:col-span-2 pt-10 flex flex-wrap gap-4">
            <a href="https://jajisqcafe.com/book" className={`${caps} bg-black text-white px-6 py-3`}>Book the Q Café hall</a>
            <Link to="/myorders" className={`${caps} bg-[#efedea] px-6 py-3`}>My orders</Link>
            <Link to={isAuthenticated ? "/profile" : "/login"} className={`${caps} bg-black text-white px-6 py-3`}>
              {isAuthenticated ? "My account" : "Log in"}
            </Link>
          </div>
          <div className="sm:col-span-2 pt-10 flex gap-6">
            <a href="https://www.instagram.com/jajisgroup" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram className="w-5 h-5" /></a>
            <a href="https://www.facebook.com/share/1DPhDM11zx/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF className="w-5 h-5" /></a>
            <a href="https://youtube.com/@jajisunil" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube className="w-5 h-5" /></a>
          </div>
        </nav>
      </div>

      {/* Mobile bottom bar */}
      <nav
        aria-label="Quick links"
        className={`fixed bottom-0 left-0 right-0 z-[95] bg-[#efedea] md:hidden transition-transform duration-300 ${barHidden && !isOpen ? "translate-y-full" : ""}`}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="grid grid-cols-5 h-16">
          {[
            ["/", "Home", Home],
            ["/products", "Shop", Store],
            ["/cart", "Cart", ShoppingBag],
            ["/wishlist", "Wishlist", Heart],
            [isAuthenticated ? "/profile" : "/login", isAuthenticated ? "Account" : "Log in", User],
          ].map(([to, label, Icon]) => (
            <NavLink
              key={label}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 text-[13px] ${
                  isActive ? "text-black font-medium" : "text-[#4d4d4d]"
                }`
              }
            >
              <Icon className="w-5 h-5" strokeWidth={1.5} />
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
}
