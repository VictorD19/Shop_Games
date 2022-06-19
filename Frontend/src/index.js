import React from "react";
import ReactDOM from "react-dom/client";
import "./reset-css.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "react-bootstrap";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider breakpoints={["lg", "md", "sm", "xs"]}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
