import React from "react";
import IcBaselineDeleteForever from "../icons/IcBaselineDeleteForever";
import { useContext } from "react";
import { ProductsContext } from "../../ProductsContext";
const OrderCard = ({ item, handleDeleteOrder }) => {
  const { images } = useContext(ProductsContext);
  return (
    <li key={item.id} className="grid z-10 gap-2 grid-cols-8">
      <img
        src={`${images[item.imageId]}`}
        alt="Item"
        className="aspect-square col-span-2 w-full rounded"
      />
      <div className="col-span-6">
        <h1 className="text-lg font-semibold text-zinc-800">{item.name}</h1>
        <div className="flex justify-between items-end">
          <p className="text-zinc-400 font-semibold">x{item.quantity} </p>{" "}
          <p className="text-medium text-primary text-lg">
            {item.price * item.quantity} Kyat
          </p>
        </div>

        <button onClick={() => handleDeleteOrder(item.id)}>
          <IcBaselineDeleteForever className="text-lg text-red-600" />
        </button>
      </div>
    </li>
  );
};

export default OrderCard;
