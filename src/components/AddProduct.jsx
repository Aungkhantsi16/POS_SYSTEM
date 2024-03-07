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
      navigate("/");
    };
    reader.readAsDataURL(formData.image);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-fit m-0 mx-auto mt-40"
    >
      <label htmlFor="name" className="font-bold">
        Name:
      </label>
      <input
        className="p-2 border border-gray-300 rounded"
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <br />
      <label htmlFor="price" className="font-bold">
        Price:
      </label>
      <input
        className="p-2 border border-gray-300 rounded"
        type="number"
        id="price"
        name="price"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <br />
      <br />
      <label htmlFor="image" className="font-bold">
        Image:
      </label>
      <input
        className="p-2 border border-gray-300 rounded"
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
          className="w-64 h-64 object-cover mt-4"
        />
      )}
      <br />
      <button
        type="submit"
        className="bg-sky-600 text-white p-0.5 px-1 rounded cursor-pointer border-none hover:bg-sky-900"
      >
        Submit
      </button>
    </form>
  );
}

export default AddProduct;
