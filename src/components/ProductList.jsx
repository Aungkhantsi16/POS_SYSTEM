// ProductList.jsx
import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../ProductsContext";
import ProductCard from "./ProductCard";

const ProductList = ({ onAddToOrder }) => {
  const { products, editProduct } = useContext(ProductsContext);
  const [updatedProducts, setUpdatedProducts] = useState([]);

  useEffect(() => {
    setUpdatedProducts(products);
  }, [products]);

  return (
    <div className="grid grid-cols-4 gap-5 mt-8 ml-4 w-full">
      {updatedProducts.map((product) => (
        <ProductCard
          onAddToOrder={onAddToOrder}
          key={product.id}
          product={product}
          editProduct={editProduct}
          images={product.images}
        />
      ))}
    </div>
  );
};

export default ProductList;
