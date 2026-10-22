import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { SiteApp } from "./SiteApp";
import { metadataForPage, publishedPages, resolvePage } from "./pages";

export { metadataForPage, publishedPages };
export function renderPage(pathname: string) {
  const page = resolvePage(pathname);
  return { html: renderToString(<StrictMode><SiteApp page={page} /></StrictMode>), metadata: metadataForPage(page) };
}
