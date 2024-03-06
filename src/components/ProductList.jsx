import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from a reliable source (e.g., a server)
    // For now, we'll use localStorage for demonstration
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      try {
        const parsedProducts = JSON.parse(storedProducts);
        setProducts(parsedProducts);
      } catch (error) {
        console.error("Error parsing local storage data:", error);
      }
    }
  }, []);

  return (
    <div className="flex flex-wrap justify-between p-4 w-full box-border">
      {products && (
        <ul>
          {products.map((product, index) => (
            <ProductCard key={product.id || index} product={product} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductList;
