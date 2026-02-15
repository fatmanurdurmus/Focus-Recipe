import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootswatch/dist/minty/bootstrap.min.css"; 
import "./index.css";
import App from "./App.tsx";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Uygulamada sayfa geçişi (routing) için */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
