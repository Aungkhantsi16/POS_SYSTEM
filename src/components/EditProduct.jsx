import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductsContext } from "../ProductsContext";

function EditProduct() {
  const { products, updateProduct } = useContext(ProductsContext);
  const navigate = useNavigate();
  const { productId } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: null,
  });

  useEffect(() => {
    if (!productId || !products) {
      console.error(
        "Product ID not found in URL or products not found in context."
      );
      navigate("/");
      return;
    }

    const product = products.find((item) => item.id === parseInt(productId));

    if (product) {
      // Use the product's data to initialize formData
      setFormData({
        name: product.name,
        price: product.price,
        image: product.image,
      });
    } else {
      console.error("Product not found for editing.");
      navigate("/");
    }
  }, [products, productId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProducts = products.map((item) =>
      item.id === parseInt(productId) ? { ...item, ...formData } : item
    );
    updateProduct(updatedProducts);
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow"
    >
      <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
      <label className="block mb-2 font-semibold">Name:</label>
      <input
        className="w-full p-2 border border-gray-300 rounded"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <label className="block mb-2 font-semibold">Price:</label>
      <input
        className="w-full p-2 border border-gray-300 rounded"
        type="text"
        name="price"
        value={formData.price}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700"
      >
        Save
      </button>
    </form>
  );
}

export default EditProduct;
