import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Seo from "./components/Seo";
import { PAGE_SEO } from "./seo-pages";
import { useLocation } from "react-router-dom";

// Every other page is downloaded only when someone opens it. lazyPage() also lets
// main.jsx load the current page *before* React starts, so the pre-rendered HTML
// is swapped for the live page without a loading flash.
function lazyPage(loader) {
  let Loaded = null;
  const Lazy = lazy(() => loader().then((m) => ((Loaded = m.default), m)));
  function Page(props) {
    return Loaded ? <Loaded {...props} /> : <Lazy {...props} />;
  }
  Page.preload = () => loader().then((m) => (Loaded = m.default));
  return Page;
}
const Salons = lazyPage(() => import("./pages/Salons"));
const SalonDetails = lazyPage(() => import("./pages/salon_details"));
const Cosmetics = lazyPage(() => import("./pages/Cosmetics"));
const EventHall = lazyPage(() => import("./pages/EventHall"));
const FoodCourt = lazyPage(() => import("./pages/FoodCourt"));
const DesigningStitching = lazyPage(() => import("./pages/DesigningStitching"));
const Academy = lazyPage(() => import("./pages/Academy"));
const Franchise = lazyPage(() => import("./pages/Franchise"));
const AboutUs = lazyPage(() => import("./pages/AboutUs"));
const Contact = lazyPage(() => import("./pages/Contact"));
const Privacy = lazyPage(() => import("./pages/privacy"));
const Terms = lazyPage(() => import("./pages/terms"));
const HouseOfJajis = lazyPage(() => import("./pages/HouseOfJajis"));
const ReturnPolicy = lazyPage(() => import("./pages/ReturnPolicy"));
const Management = lazyPage(() => import("./pages/management"));
const Login = lazyPage(() => import("./pages/E-Login"));
const Register = lazyPage(() => import("./pages/E-Register"));
const ForgotPassword = lazyPage(() => import("./pages/E-forgot-password"));
const Product = lazyPage(() => import("./pages/E-product_list"));
const ProductDetails = lazyPage(() => import("./pages/E-product_details"));
const Cart = lazyPage(() => import("./pages/E-cart"));
const WishList = lazyPage(() => import("./pages/E-wishlist"));
const MyOrders = lazyPage(() => import("./pages/E-myorders"));
const OrderSuccess = lazyPage(() => import("./pages/OrderSuccess"));
const UserProfile = lazyPage(() => import("./pages/E-user_profile"));


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

const PRELOAD = [
  [/^\/salons\/?$/, () => Salons],
  [/^\/cosmetics/, () => Cosmetics],
  [/^\/event-hall/, () => EventHall],
  [/^\/food-court/, () => FoodCourt],
  [/^\/designing-stitching/, () => DesigningStitching],
  [/^\/academy/, () => Academy],
  [/^\/franchise/, () => Franchise],
  [/^\/about-us/, () => AboutUs],
  [/^\/contact/, () => Contact],
  [/^\/privacy/, () => Privacy],
  [/^\/terms/, () => Terms],
  [/^\/house-of-jajis/, () => HouseOfJajis],
  [/^\/(return|refund)-policy/, () => ReturnPolicy],
  [/^\/management/, () => Management],
  [/^\/products\/?$/, () => Product],
  [/^\/product\//, () => ProductDetails],
];

/** Load the code for the page at `pathname` (if it is split out) before first render. */
export function preloadRoute(pathname) {
  const hit = PRELOAD.find(([re]) => re.test(pathname));
  return hit ? hit[1]().preload().catch(() => {}) : Promise.resolve();
}

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
              <Route path="/house-of-jajis" element={<HouseOfJajis />} />
              <Route path="/return-policy" element={<ReturnPolicy />} />
              <Route path="/refund-policy" element={<ReturnPolicy />} />
              <Route path="/management" element={<Management />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/products" element={<Product />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/myorders" element={guard(<MyOrders />)} />
              <Route path="/order-success/:id" element={<OrderSuccess />} />
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
