import React from "react";
import { ProductsContext, ProductsProvider } from "./ProductsContext";
import ProductList from "./components/ProductList";
import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <div className="flex justify-center gap-10 mt-20">
        <label className="text-xl font-bold">Add Product</label>
        <Link className="no-underline text-xl font-bold" to="/addproduct">
          +
        </Link>
      </div>
      <ProductList />
    </div>
  );
}

export default App;
