import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Seo from "./components/Seo";
import { useLocation } from "react-router-dom";

// Every other page is downloaded only when someone opens it.
const Salons = lazy(() => import("./pages/Salons"));
const SalonDetails = lazy(() => import("./pages/salon_details"));
const Cosmetics = lazy(() => import("./pages/Cosmetics"));
const EventHall = lazy(() => import("./pages/EventHall"));
const FoodCourt = lazy(() => import("./pages/FoodCourt"));
const DesigningStitching = lazy(() => import("./pages/DesigningStitching"));
const Academy = lazy(() => import("./pages/Academy"));
const Franchise = lazy(() => import("./pages/Franchise"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/privacy"));
const Terms = lazy(() => import("./pages/terms"));
const Management = lazy(() => import("./pages/management"));
const Login = lazy(() => import("./pages/E-Login"));
const Register = lazy(() => import("./pages/E-Register"));
const ForgotPassword = lazy(() => import("./pages/E-forgot-password"));
const Product = lazy(() => import("./pages/E-product_list"));
const ProductDetails = lazy(() => import("./pages/E-product_details"));
const Cart = lazy(() => import("./pages/E-cart"));
const WishList = lazy(() => import("./pages/E-wishlist"));
const MyOrders = lazy(() => import("./pages/E-myorders"));
const UserProfile = lazy(() => import("./pages/E-user_profile"));

const PAGE_SEO = {
  "/": {},
  "/products": { title: "Shop hair & skin care online", description: "Shop Jaji's Research hair and skin care and professional salon brands online — shampoos, serums, sunscreen, face wash and more, delivered across India." },
  "/salons": { title: "Salons in Kollam, Karunagappally, Sasthamcotta, Paravur & Trivandrum", description: "Jaji's Innovation unisex beauty salons and bridal makeup studios across Kerala — hair, skin, bridal and spa. Find your nearest salon." },
  "/cosmetics": { title: "Cosmetics by Jaji's Research", description: "Hair and skin care developed by Jaji's Research and tested in our own salons." },
  "/academy": { title: "Beauty & hairdressing academy", description: "Professional beauty, makeup and hairdressing courses at Jaji's Academy, Kollam." },
  "/event-hall": { title: "Q Café & Event Hall, Asramam, Kollam", description: "Book the Q Café A/C hall or our larger venues in Kollam for birthdays, weddings, receptions and corporate events." },
  "/food-court": { title: "Food Court at Ashramam Maidanam, Kollam", description: "Open-air dining at Ashramam Maidanam, Kollam — South Indian, Chinese, fresh juices and Q Chai." },
  "/designing-stitching": { title: "Designing & Stitching Studio, Polayathodu", description: "Custom design, bridal wear, embroidery and alterations at Jaji's Designing & Stitching Studio, Kollam." },
  "/franchise": { title: "Salon franchise opportunity", description: "Own a Jaji's salon. Training, branding, set-up and ongoing support from Kerala's family salon brand since 2002." },
  "/about-us": { title: "About us", description: "The story of Jaji's Innovation — beauty and lifestyle in Kerala since 2002." },
  "/management": { title: "Management", description: "Meet Dr. Jajimole K and the leadership team of Jaji's Innovation Pvt. Ltd." },
  "/contact": { title: "Contact us", description: "Call, WhatsApp or visit Jaji's salons, Q Café, Food Court, studio and academy across Kerala." },
};

function RouteSeo() {
  const { pathname } = useLocation();
  if (pathname.startsWith("/product/")) return null; // product pages set their own
  return <Seo {...(PAGE_SEO[pathname] || {})} />;
}

function PageLoading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center" role="status">
      <div className="h-8 w-8 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
      <span className="sr-only">Loading</span>
    </div>
  );
}

const guard = (el) => <ProtectedRoute>{el}</ProtectedRoute>;

export default function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <RouteSeo />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<PageLoading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/salons" element={<Salons />} />
              <Route path="/salons/:id" element={<SalonDetails />} />
              <Route path="/cosmetics" element={<Cosmetics />} />
              <Route path="/event-hall" element={<EventHall />} />
              <Route path="/food-court" element={<FoodCourt />} />
              <Route path="/designing-stitching" element={<DesigningStitching />} />
              <Route path="/academy" element={<Academy />} />
              <Route path="/franchise" element={<Franchise />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/management" element={<Management />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/products" element={<Product />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={guard(<Cart />)} />
              <Route path="/myorders" element={guard(<MyOrders />)} />
              <Route path="/wishlist" element={guard(<WishList />)} />
              <Route path="/profile" element={guard(<UserProfile />)} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
