import React, { useState, useEffect, createContext, useContext } from "react";

export const OrderContext = createContext();

export const OrderContextProvider = ({ children }) => {
  const [order, setOrder] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [coinsGenerated, setCoinsGenerated] = useState(0);

  const generateOrderId = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = 6;
    let orderId = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      orderId += characters.charAt(randomIndex);
    }
    return orderId;
  };

  const handleDeleteOrder = (orderId) => {
    setOrder((prevOrder) => prevOrder.filter((item) => item.id !== orderId));
  };

  useEffect(() => {
    const calculateTotal = () => {
      let newTotal = 0;
      for (const item of order) {
        newTotal += item.price * item.quantity;
      }
      setTotalAmount(newTotal); // Set total amount with 2 decimal places
      setCoinsGenerated(Math.floor(newTotal / 1000)); // Round down to whole coins
    };

    calculateTotal();
  }, [order]);

  return (
    <OrderContext.Provider
      value={{
        order,
        handleDeleteOrder,
        totalAmount,
        coinsGenerated,
        setOrder,
        setTotalAmount,
        setCoinsGenerated,
        generateOrderId,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
export const useOrderContext = () => useContext(OrderContext);
