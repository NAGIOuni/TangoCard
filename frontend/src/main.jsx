import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./scss/styles.scss";
import * as bootstrap from "bootstrap";
import { AuthContextProvider } from "./state/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
