import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import faviconUrl from "../images/logo icon tab.png";

function createWhiteFavicon(src: string): string {
  const img = new Image();
  img.src = src;
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d")!;
  img.onload = () => {
    ctx.filter = "brightness(0) invert(1)";
    ctx.drawImage(img, 0, 0, 32, 32);
    const link = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null;
    if (link) link.href = canvas.toDataURL("image/png");
  };
  return src;
}

createWhiteFavicon(faviconUrl);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
