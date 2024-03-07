import React, { createContext, useState, useEffect, useContext } from "react";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const MAX_PRODUCTS = 10;
  const MAX_IMAGES = 10;
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState({});

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      try {
        const parsedProducts = JSON.parse(storedProducts);
        if (Array.isArray(parsedProducts)) {
          setProducts(parsedProducts.slice(0, MAX_PRODUCTS));
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

    const storedImages = localStorage.getItem("images");
    if (storedImages) {
      try {
        const parsedImages = JSON.parse(storedImages);
        setImages(parsedImages);
      } catch (error) {
        console.error("Error parsing local storage image data:", error);
        resetLocalStorage();
      }
    } else {
      setImages({});
    }
  }, []);

  const resetLocalStorage = () => {
    localStorage.setItem("products", JSON.stringify([]));
    localStorage.setItem("images", JSON.stringify({}));
    setProducts([]);
    setImages({});
  };

  const updateProduct = (updatedProducts) => {
    const limitedProducts = updatedProducts.slice(0, MAX_PRODUCTS);
    setProducts(limitedProducts);
    localStorage.setItem("products", JSON.stringify(limitedProducts));
  };

  const updateImage = (imageId, imageData) => {
    const storedImages = localStorage.getItem("images");
    let images = {};

    if (storedImages) {
      try {
        images = JSON.parse(storedImages);
      } catch (error) {
        console.error("Error parsing local storage image data:", error);
      }
    }

    const updatedImages = { ...images, [imageId]: imageData };
    const limitedImages = Object.fromEntries(
      Object.entries(updatedImages).slice(-MAX_IMAGES)
    );
    setImages(limitedImages);
    localStorage.setItem("images", JSON.stringify(limitedImages));
  };

  return (
    <ProductsContext.Provider
      value={{ products, updateProduct, images, updateImage }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
