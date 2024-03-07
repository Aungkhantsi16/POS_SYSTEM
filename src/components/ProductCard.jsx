import React, { useContext } from "react";
import { ProductsContext } from "../ProductsContext";

function ProductCard({ product }) {
  const { images, updateProduct, products } = useContext(ProductsContext);

  const handleEdit = () => {
    navigate(`/editproduct/${product.id}`);
  };

  const handleDelete = () => {
    const updatedProducts = products.filter((item) => item.id !== product.id);
    updateProduct(updatedProducts);
  };

  return (
    <div className="w-64 m-4 p-4 bg-white rounded shadow-sm flex flex-col items-center">
      <img
        src={images[product.imageId]}
        alt={product.name}
        className="w-full h-48 object-cover"
      />

      <div className="text-center mt-4">
        <h3>{product.name}</h3>
        <p>${product.price}</p>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={handleEdit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProductCard;