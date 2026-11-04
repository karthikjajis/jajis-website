// Build-time renderer: turns each public page into real HTML so search engines
// see the content straight away (scripts/prerender.mjs writes the files).
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Salons from "./pages/Salons";
import BookAppointment from "./pages/BookAppointment";
import Cosmetics from "./pages/Cosmetics";
import EventHall from "./pages/EventHall";
import FoodCourt from "./pages/FoodCourt";
import DesigningStitching from "./pages/DesigningStitching";
import Academy from "./pages/Academy";
import Franchise from "./pages/Franchise";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Privacy from "./pages/privacy";
import Terms from "./pages/terms";
import Management from "./pages/management";
import HouseOfJajis from "./pages/HouseOfJajis";
import ReturnPolicy from "./pages/ReturnPolicy";

export { PAGE_SEO } from "./seo-pages";

const PAGES = {
  "/": Home,
  "/salons": Salons,
  "/book": BookAppointment,
  "/cosmetics": Cosmetics,
  "/event-hall": EventHall,
  "/food-court": FoodCourt,
  "/designing-stitching": DesigningStitching,
  "/academy": Academy,
  "/franchise": Franchise,
  "/about-us": AboutUs,
  "/contact": Contact,
  "/privacy": Privacy,
  "/terms": Terms,
  "/management": Management,
  "/house-of-jajis": HouseOfJajis,
  "/return-policy": ReturnPolicy,
};

export const ROUTES = Object.keys(PAGES);

function Shell({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

/** Full page for one of the routes above. */
export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <Shell>
        <Routes>
          {Object.entries(PAGES).map(([path, Page]) => (
            <Route key={path} path={path} element={<Page />} />
          ))}
        </Routes>
      </Shell>
    </StaticRouter>,
  );
}

/** Product page: the site's header/footer around plain product content. */
export function renderProduct(url, inner) {
  return renderToString(
    <StaticRouter location={url}>
      <Shell>
        <div className="pt-24" dangerouslySetInnerHTML={{ __html: inner }} />
      </Shell>
    </StaticRouter>,
  );
}
