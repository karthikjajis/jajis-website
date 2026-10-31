import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag, Heart, User, Home, Store } from "lucide-react";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import logo from "../assets/img/images-logo.webp";

const menuItems = [
  { path: "/", label: "Home" },
  { path: "/products", label: "Shop online" },
  { path: "/salons", label: "Salons" },
  { path: "/house-of-jajis", label: "House of Jaji’s · Coming soon" },
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

const caps = "text-[0.8rem] font-medium tracking-[0.16em] uppercase";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem("token");

  // Close the menu whenever the page changes, and stop the page scrolling behind it.
  useEffect(() => setIsOpen(false), [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  const linkClass = ({ isActive }) =>
    `${caps} py-2 border-b ${isActive ? "border-black" : "border-transparent hover:border-black"}`;

  return (
    <>
      {/* Fixed header: 32px strip + 64px bar = 96px, same height pages already leave room for */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white">
        <p className="h-8 flex items-center justify-center bg-black text-white text-[0.7rem] tracking-[0.2em] uppercase px-4 text-center">
          <span className="hidden sm:inline mr-1">Kerala’s family salon since 2002 ·</span>
          <Link to="/products" className="underline underline-offset-4">
            Shop Jaji’s online
          </Link>
        </p>

        <div className="h-16 border-b border-gray-200 px-4 lg:px-12 grid grid-cols-[1fr_auto_1fr] items-center">
          <div className="flex items-center gap-7">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              className="p-2 -ml-2"
            >
              <Menu className="w-6 h-6" strokeWidth={1.5} />
            </button>
            <nav aria-label="Main" className="hidden lg:flex items-center gap-7">
              {desktopLinks.map((l) => (
                <NavLink key={l.path} to={l.path} className={linkClass}>
                  {l.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <Link to="/" aria-label="Jaji's home" className="justify-self-center">
            <img src={logo} alt="Jaji's Innovation" className="h-12 w-auto" width="120" height="48" />
          </Link>

          <div className="flex items-center justify-end gap-6">
            <NavLink to="/wishlist" className={(s) => `${linkClass(s)} hidden md:block`}>
              Wishlist
            </NavLink>
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
          </div>
        </div>
      </header>

      {/* Full-screen menu */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed inset-0 bg-white z-[100] overflow-y-auto transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="h-16 px-4 lg:px-12 flex items-center justify-between border-b border-gray-200">
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
                `py-4 border-b border-gray-200 text-lg tracking-[0.14em] uppercase ${
                  isActive ? "font-medium" : "font-light hover:pl-2 transition-all"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="sm:col-span-2 pt-10 flex flex-wrap gap-4">
            <a href="https://jajisqcafe.com/book" className={`${caps} bg-black text-white px-6 py-3`}>Book Q Café hall</a>
            <Link to="/myorders" className={`${caps} border border-black px-6 py-3`}>My orders</Link>
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
        className="fixed bottom-0 left-0 right-0 z-[95] bg-white border-t border-gray-200 md:hidden"
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
                `flex flex-col items-center justify-center gap-1 text-[0.65rem] tracking-[0.12em] uppercase ${
                  isActive ? "text-black font-medium" : "text-gray-500"
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
