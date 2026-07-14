import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AdminApp from "./apps/AdminApp.jsx";
import "./styles/app-shell.css";

// Application composition is kept here: global CSS, router, and the root admin app.
// Feature-level state and API calls must live below src/apps and src/api instead.
createRoot(document.getElementById("root")).render(
  <React.StrictMode><BrowserRouter><AdminApp /></BrowserRouter></React.StrictMode>,
);
