import React from "react";
import ReactDOM from "react-dom/client";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./reset-css.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "react-bootstrap";
import { AlertsProvider } from "./Context/alertContext";
import { UserProvider } from "./Context/userContext";
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";
import { CartProvider } from "./Context/cartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          <ThemeProvider breakpoints={["lg", "md", "sm", "xs"]}>
            <AlertsProvider>
              <App />
            </AlertsProvider>
          </ThemeProvider>
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
