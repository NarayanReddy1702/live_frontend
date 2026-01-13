import { useEffect, useState } from "react";
import { useGetOneUserQuery, useRemoverOrderListMutation } from "../../redux/state";
import toast from "react-hot-toast"

export default function OrderList() {
  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [orderDet, setOrderDet] = useState([]);

  const sizes = ["S", "M", "L", "XL"];

  const userDet = localStorage.getItem("userDet");
  const { _id } = JSON.parse(userDet);

  const { data: userData, isLoading, error } = useGetOneUserQuery(_id);
  const [removeOrder,{isLoading:loading,error:isError}] = useRemoverOrderListMutation()

  useEffect(() => {
    if (userData?.userDet?.addToCard) {
      setOrderDet(userData.userDet.addToCard);
    }
  }, [userData]);

  
 const handleDelete = async (sareeId) => {
  try {
    const res = await removeOrder({ sareeId }).unwrap();

    if (res.success) {
      toast.success(res.message);

      // remove item from UI list
      setOrderDet((prev) =>
        prev.filter((item) => item._id !== sareeId)
      );
    }
  } catch (error) {
    toast.error(error?.data?.message || "Failed to delete order");
  }
};


  if (isLoading || loading) return <p className="text-center">Loading orders...</p>;
  if (error || isError) return <p className="text-center text-red-500">Failed to load orders</p>;



  return (
   <div className="max-w-6xl mx-auto p-6">
    <h1 className="text-center pb-10 font-semibold text-2xl">OrderList</h1>
  <div className="grid grid-cols-1  md:grid-cols-2 gap-8">
    {orderDet.map((item) => (
      <div
        key={item._id}
        className="grid grid-cols-1 md:grid-cols-2  gap-6 p-4 border rounded-xl shadow-sm"
      >
        {/* Image */}
        <div className="w-full ">
          <img
            src={item.thumbline || "/product-image.jpg"}
            alt={item.name}
            className=" w-full h-full rounded-lg object-cover"
          />
        </div>

        {/* Details */}
        <div className="space-y-4">
          <h1 className="text-xl font-semibold">{item.title}</h1>

          <div className="flex items-center gap-3">
            <span className="text-lg font-bold">
              ₹{item.price * quantity}
            </span>
          </div>

          {/* Size */}
          <div>
            <p className="font-medium mb-1">Select Size</p>
            <div className="flex gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`w-9 h-9 rounded-full border text-sm font-medium
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
            <p className="font-medium mb-1">Quantity</p>
            <div className="flex items-center border w-fit rounded">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 text-lg"
              >
                −
              </button>
              <span className="px-3">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 text-lg"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 rounded-md">
              Place Order
            </button>

            <button
              onClick={() => handleDelete(item._id)}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md"
            >
              Delete
            </button>
          </div>

          <p className="text-green-600 font-medium text-sm">● In stock</p>
        </div>
      </div>
    ))}
  </div>
</div>


  );
}
