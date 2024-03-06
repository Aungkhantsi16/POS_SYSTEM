import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import NotFound from "./components/NotFound.jsx";
import App from "./App.jsx";
import AddProduct from "./components/AddProduct.jsx";
import EditProduct from "./components/EditProduct.jsx";
import { ProductsProvider } from "./ProductsContext"; // Import the ProductsProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProductsProvider>
      {" "}
      {/* Wrap your Router with ProductsProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/editproduct/:productId" element={<EditProduct />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ProductsProvider>
  </React.StrictMode>
);
