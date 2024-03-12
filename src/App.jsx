import ProductList from "./components/ProductList";
import { Link } from "react-router-dom";
import OrderBar from "./components/AddToCart/OrderBar";
import { useOrderContext } from "./OrderContext";
function App() {
  const { order, setOrder } = useOrderContext();

  const handleAddToOrder = (product) => {
    const existingItem = order.find((item) => item.id === product.id);
    if (existingItem) {
      setOrder(
        order.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setOrder([...order, { ...product, quantity: 1 }]);
    }
  };
  return (
    <div className="min-h-screen gap-3 bg-zinc-100 grid grid-cols-7 text-gray-800">
      <div className="col-span-5">
        <div className="flex px-4 justify-between items-center bg-primary py-4">
          <h1 className="text-2xl font-semibold text-white">XERA POS</h1>
          <Link
            to="/addproduct"
            className="bg-white/90 text-primary font-medium px-4 py-2 rounded hover:bg-white"
          >
            Add Product
          </Link>
        </div>
        <ProductList onAddToOrder={handleAddToOrder} />
      </div>
      <div className="col-span-2 min-h-screen px-4">
        <div className="flex flex-col bg-white mt-2  rounded-xl  py-4 justify-center gap-10  p-3">
          <div className="w-full">
            <h1 className="text-2xl font-semibold py-1 text-zinc-800">Order</h1>
          </div>
          <OrderBar />
        </div>
      </div>
    </div>
  );
}

export default App;
