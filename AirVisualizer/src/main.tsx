import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { DialogProvider } from "./hooks/dialog-hooks.tsx";
import { Analytics } from "@vercel/analytics/react"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DialogProvider>
      <App />
      <Analytics/>
    </DialogProvider>
  </StrictMode>
);
