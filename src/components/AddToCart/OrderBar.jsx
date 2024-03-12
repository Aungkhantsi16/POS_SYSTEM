import React from "react";
import IcBaselineDeleteForever from "../icons/IcBaselineDeleteForever";
import OrderCard from "./OrderCard";
import { useNavigate } from "react-router-dom";
import { useOrderContext } from "../../OrderContext";
import { supabase } from "../../utils/supabase";
import { useEffect } from "react";

export default function OrderBar() {
  const {
    order,
    handleDeleteOrder,
    totalAmount,
    generateOrderId,
    coinsGenerated,
  } = useOrderContext();
  const orderId = generateOrderId();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase
        .from("coins")
        .insert([{ orderId, coins: coinsGenerated, totalAmount }])
        .select();
      console.log(data);
    } catch (error) {
      navigate("/");
    }

    navigate(`/receipt/${orderId}`);
  };

  return (
    <div className="h-[80vh] flex flex-col justify-between">
      <ul>
        {order.map((item, index) => (
          <li key={item.id} className="mt-3">
            <OrderCard handleDeleteOrder={handleDeleteOrder} item={item} />
          </li>
        ))}
      </ul>
      <div className="">
        <div className="flex text-lg font-semibold justify-between w-full">
          <p className="text-zinc-600">Total</p>
          <p className="text-primary">{totalAmount} Kyat</p>
        </div>
        <button
          className="bg-primary w-full text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-700"
          onClick={handleSubmit}
        >
          Pay Now
        </button>
        {/* <p>Coins Generated: {coinsGenerated}</p> */}
      </div>
    </div>
  );
}
