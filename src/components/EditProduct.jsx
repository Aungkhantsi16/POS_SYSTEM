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
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditProduct;
