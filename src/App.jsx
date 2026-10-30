import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";

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
