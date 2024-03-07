// ProductList.jsx
import React, { useContext } from "react";
import { ProductsContext } from "../ProductsContext";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const { products, deleteProduct, editProduct } = useContext(ProductsContext);

  return (
    <div className="product-list">
      <ul>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            deleteProduct={deleteProduct}
            editProduct={editProduct}
            images={product.images} // Pass images prop to ProductCard
          />
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
