import Spinner from "components/Spinner";
import Layout from "layout/Layout";
import {
  Account,
  Cart,
  Order,
  Confirmation,
  Login,
  NotFound,
  Orders,
  ProductDetails,
  ProductList,
  Register,
} from "pages";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "routes/protected.route";

function App() {
  return (
    <Suspense
      fallback={
        <Layout>
          <Spinner size={100} />
        </Layout>
      }
    >
      <Toaster position="top-right" />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Account />} />
          <Route path="/cart/order" element={<Order />} />
          <Route path="/cart/success" element={<Confirmation />} />
          <Route path="/orders" element={<Orders />} />
        </Route>

        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route index element={<ProductList />} />
        <Route path="/products/:slug/" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Suspense>
  );
}

export default App;
