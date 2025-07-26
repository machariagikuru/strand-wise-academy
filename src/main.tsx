import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

import { AuthProvider } from "@/hooks/useAuth"; // ✅ import your custom provider

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <AuthProvider> {/* ✅ Your custom context */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </SessionContextProvider>
  </React.StrictMode>
);
