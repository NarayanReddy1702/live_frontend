import { useEffect, useState } from "react";
import { useGetOneUserQuery } from "../../redux/state";

export default function OrderList() {
  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [orderDet, setOrderDet] = useState([]);

  const sizes = ["S", "M", "L", "XL"];

  const userDet = localStorage.getItem("userDet");
  const { _id } = JSON.parse(userDet);

  const { data: userData, isLoading, error } = useGetOneUserQuery(_id);

  useEffect(() => {
    if (userData?.userDet?.addToCard) {
      setOrderDet(userData.userDet.addToCard);
    }
  }, [userData]);

  if (isLoading) return <p className="text-center">Loading orders...</p>;
  if (error) return <p className="text-center text-red-500">Failed to load orders</p>;

  return (
    <div className="max-w-6xl flex items-center flex-col mx-auto p-6">
      {orderDet.length > 0 ? (
        orderDet.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10"
          >
            {/* Image */}
            <div className="w-full">
              <img
                src={item.thumbline || "/product-image.jpg"}
                alt={item.name}
                className="w-100% rounded-lg object-cover"
              />
            </div>

            {/* Details */}
            <div className="space-y-5">
              <h1 className="text-2xl font-semibold">{item.title}</h1>

              <div className="flex items-center gap-3">
                <span className="text-xl font-bold">₹{item.price*quantity}</span>
              </div>

              {/* Size */}
              <div>
                <p className="font-medium mb-2">Select Size</p>
                <div className="flex gap-3">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`w-10 h-10 rounded-full border text-sm font-medium
                        ${
                          size === s
                            ? "bg-black text-white border-black"
                            : "border-gray-300 text-gray-700"
                        }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <p className="font-medium mb-2">Quantity</p>
                <div className="flex items-center border w-fit rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-lg"
                  >
                    −
                  </button>
                  <span className="px-4">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Button */}
              <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 rounded-md">
                Place Order
              </button>

              <p className="text-green-600 font-medium text-sm">● In stock</p>
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-center text-xl font-semibold">No Orders Found</h1>
      )}
    </div>
  );
}
