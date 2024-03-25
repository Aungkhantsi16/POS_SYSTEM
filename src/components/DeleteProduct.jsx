import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductsContext } from "../ProductsContext";

function DeleteProduct() {
  const { products, updateProduct } = useContext(ProductsContext);
  const navigate = useNavigate();
  const { productId } = useParams();
  const [confirmationInput, setConfirmationInput] = useState("");

  const handleDelete = () => {
    const updatedProducts = products.filter(
      (item) => item.id !== parseInt(productId)
    );
    updateProduct(updatedProducts);
    navigate("/"); // Navigate to the home page after deletion
  };

  const handleChange = (e) => {
    setConfirmationInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (confirmationInput.toLowerCase() === "delete") {
      handleDelete();
    } else {
      alert("Please type 'delete' to confirm deletion.");
      // Clear the input field after submissiopn
      setConfirmationInput("");
    }
  };

  useEffect(() => {
    if (!productId || !products) {
      console.error(
        "Product ID not found in URL or products not found in context."
      );
      navigate("/");
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <form
        onSubmit={handleSubmit}
        className="max-w-md p-6 w-full bg-white rounded shadow"
      >
        <h2 className="text-xl font-semibold mb-4">Delete Product</h2>
        <p>Please type "delete" to confirm deletion:</p>
        <input
          className="w-full p-2 border border-gray-300 rounded"
          type="text"
          value={confirmationInput}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-700"
        >
          Delete
        </button>
      </form>
    </div>
  );
}

export default DeleteProduct;
