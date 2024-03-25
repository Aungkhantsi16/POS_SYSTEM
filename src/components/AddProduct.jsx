import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductsContext } from "../ProductsContext";

function AddProduct() {
  const navigate = useNavigate();
  const { updateImage, updateProduct } = useContext(ProductsContext); // Destructure updateProduct from ProductsContext
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: null,
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const storedProducts = localStorage.getItem("products");
    let products = [];
    if (storedProducts) {
      try {
        products = JSON.parse(storedProducts);
      } catch (error) {
        console.error("Error parsing local storage data:", error);
      }
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageId = Math.random().toString(36).substring(7);
      const imageFiles = JSON.parse(localStorage.getItem("images")) || {};
      imageFiles[imageId] = e.target.result;

      const productData = {
        id:
          products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
        ...formData,
        imageId: imageId,
      };

      products.push(productData);
      localStorage.setItem("products", JSON.stringify(products));

      // Update images in local storage
      updateImage(imageId, e.target.result);

      setFormData({ name: "", price: "", imageId: null });
      navigate("/"); // Navigate back to the main page
    };
    reader.readAsDataURL(formData.image);
  };

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full p-6 bg-white rounded shadow"
      >
        <h2 className="text-xl font-semibold mb-4">Product Information</h2>
        <label className="block mb-2 font-semibold">Product Name:</label>
        <input
          className="w-full p-2 border border-gray-300 rounded"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label className="block mt-4 mb-2 font-semibold">Price:</label>
        <input
          className="w-full p-2 border border-gray-300 rounded"
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <label className="block mt-4 mb-2 font-semibold">Image:</label>
        <input
          className="w-full p-2 border border-gray-300 rounded"
          type="file"
          id="image"
          name="image"
          onChange={(event) =>
            setFormData({ ...formData, image: event.target.files[0] })
          }
          accept="image/*"
          required
        />
        {formData.image && (
          <img
            src={URL.createObjectURL(formData.image)}
            alt="Preview"
            className="mt-4 w-full h-40 object-cover"
          />
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
