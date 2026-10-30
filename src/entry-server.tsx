import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { profile } from "./data/profile";

export { buildStructuredData } from "./seo/structuredData";
export { buildLlmsFullTxt, buildLlmsTxt } from "./seo/llmsText";

export const siteUrl = profile.siteUrl;

// Crawlers and answer engines that don't run JavaScript read this markup; main.tsx then hydrates it.
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
