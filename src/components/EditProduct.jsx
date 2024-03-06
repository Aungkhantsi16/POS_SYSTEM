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
      className="flex flex-col gap-4 w-fit m-0 mx-auto mt-40"
    >
      <h2 className="font-bold text-2xl tracking-wide">EDIT PRODUCT</h2>
      <label className="font-bold">Name:</label>
      <input
        className="p-2 border border-gray-300 rounded"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <br />
      <label className="font-bold">Price:</label>
      <input
        className="p-2 border border-gray-300 rounded"
        type="text"
        name="price"
        value={formData.price}
        onChange={handleChange}
      />
      <br />
      <button
        type="submit"
        className="bg-sky-600 text-white p-0.5 px-1 rounded cursor-pointer border-none hover:bg-sky-900"
      >
        Save
      </button>
    </form>
  );
}

export default EditProduct;
