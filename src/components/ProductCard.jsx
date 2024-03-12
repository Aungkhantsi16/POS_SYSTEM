// ProductCard.jsx
import React, { useContext } from "react";
import { ProductsContext } from "../ProductsContext";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import MingcuteMore4Fill from "./icons/MingcuteMore4Fill";
function ProductCard({ product, onAddToOrder }) {
  const { products, updateProduct, images } = useContext(ProductsContext);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/editproduct/${product.id}`);
  };

  const handleDelete = () => {
    navigate(`/deleteproduct/${product.id}`);
  };

  return (
    <div
      className="w-full p-2 z-0 bg-white rounded-xl shadow-sm flex flex-col "
      onClick={() => onAddToOrder(product)}
    >
      <img
        src={images[product.imageId]} // Use images from ProductsContext
        alt={product.name}
        className="w-full h-48 rounded-lg object-cover"
      />

      <div className="flex justify-between z-50">
        <div className="ml-2 mt-4">
          <h3 className="text-xl font-medium text-zinc-800">{product.name}</h3>
          <p className="text-lg text-primary">{product.price} Kyat</p>
        </div>
        <DropdownMenu className="h-fit z-50 outline-none focus:outline-none">
          <DropdownMenuTrigger asChild>
            <button className="">
              <MingcuteMore4Fill className="text-xl text-primary-light" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuItem className="font-medium" onClick={handleEdit}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDelete}
                className="text-red-600 font-semibold"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default ProductCard;
