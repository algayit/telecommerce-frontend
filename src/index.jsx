import { Windmill } from "@windmill/react-ui";
import { GlobalHistory } from "components/GlobalHistory";
import { CartProvider } from "context/CartContext";
import { OrderProvider } from "context/OrderContext";
import { ProductProvider } from "context/ProductContext";
import { UserProvider } from "context/UserContext";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);


root.render(
    <HelmetProvider>
      <Windmill>
        <UserProvider>
          <ProductProvider>
              <CartProvider>
                <OrderProvider>
                  <BrowserRouter>
                    <GlobalHistory />
                    <App />
                  </BrowserRouter>
                </OrderProvider>
              </CartProvider>
          </ProductProvider>
        </UserProvider>
      </Windmill>
    </HelmetProvider>
);
