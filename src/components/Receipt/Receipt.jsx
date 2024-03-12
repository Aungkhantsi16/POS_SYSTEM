import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import { useOrderContext } from "../../OrderContext";
import OrderCard from "../AddToCart/OrderCard";
OrderCard;

const Receipt = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { order, totalAmount, setOrder, setTotalAmount, setCoinsGenerated } =
    useOrderContext();
  const handleCancel = () => {
    setOrder([]);
    setTotalAmount(0);
    setCoinsGenerated(0);
    navigate("/");
  };
  return (
    <section className="max-w-6xl h-[90vh] mx-auto flex justify-center items-center mt-6 ">
      <div className=" w-2/6 rounded-2xl bg-slate-300 flex flex-col ">
        <div className="row-span-1 p-7 rounded-t-2xl  bg-primary-light">
          <p className="text-white text-lg text-center font-semibold">
            Thank you for your purchase
          </p>
        </div>
        <div className="row-span-5 text-base font-semibold">
          <h2 className="text-zinc-800 mb-2 text-lg mt-2 ml-2">
            Order Details
          </h2>
          <div>
            {order.map((item, index) => (
              <li
                key={index}
                className="flex text-zinc-600 mt-2 mx-2 justify-between mb-1"
              >
                <span>{item.name}</span>
                <span>
                  {item.quantity} x {item.price} Kyat
                </span>
              </li>
            ))}
            <p className="text-lg text-zinc-800 m-2">
              Total: {totalAmount} Kyat
            </p>
            <button
              className="bg-primary w-full text-white px-4 py-2 rounded mt-5 hover:bg-blue-700"
              onClick={handleCancel}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center flex-col items-center gap-4">
        <div className="h-auto max-w-sm ml-5 border border-red-500 p-6">
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={`https://xeracoin.vercel.app/reward-coins/${orderId}`}
            viewBox={`0 0 256 256`}
          />
        </div>
        <p className="text-semibold text-zinc-700">
          Use this QR code to claim coins
        </p>
      </div>
    </section>
  );
};

export default Receipt;
