import React, { createContext, useState, useEffect } from "react";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      try {
        const parsedProducts = JSON.parse(storedProducts);
        if (Array.isArray(parsedProducts)) {
          setProducts(parsedProducts);
        } else {
          console.error(
            "Invalid data format in localStorage. Resetting products."
          );
          resetLocalStorage();
        }
      } catch (error) {
        console.error("Error parsing local storage data:", error);
        resetLocalStorage();
      }
    } else {
      setProducts([]);
    }
  }, []);

  const resetLocalStorage = () => {
    localStorage.setItem("products", JSON.stringify([]));
    setProducts([]);
  };

  const updateProduct = (updatedProducts) => {
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  return (
    <ProductsContext.Provider value={{ products, updateProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
