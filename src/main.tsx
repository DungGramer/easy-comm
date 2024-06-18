import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme>
      <Router>
        <App />
        {/* <ThemePanel /> */}
      </Router>
    </Theme>
  </React.StrictMode>
);
