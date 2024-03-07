import React from "react";
import ProductList from "./components/ProductList";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <div className="flex justify-center items-center bg-white py-4">
        <h1 className="text-3xl font-semibold">Product Lists</h1>
      </div>
      <div className="flex justify-center gap-10 mt-8">
        <Link
          to="/addproduct"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </Link>
      </div>
      <ProductList />
    </div>
  );
}

export default App;
