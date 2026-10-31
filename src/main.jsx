import React from "react";
import ReactDOM from "react-dom/client";
import App, { preloadRoute } from "./App";
import "./index.css";

// Pages are pre-rendered to HTML at build time for search engines. Load the
// current page's code first, then let React take over the same container.
preloadRoute(window.location.pathname).then(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
