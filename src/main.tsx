import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { SiteApp } from "./SiteApp";
import { resolvePage } from "./pages";
import "./index.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element #root was not found.");
}

document.documentElement.classList.toggle(
  "dark",
  window.localStorage.getItem("portfolio-theme") === "dark",
);

const app = (
  <StrictMode>
    <SiteApp page={resolvePage(window.location.pathname)} />
  </StrictMode>
);

if (root.children.length > 0) hydrateRoot(root, app);
else createRoot(root).render(app);
