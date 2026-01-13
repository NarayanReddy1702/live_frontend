import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetACardQuery, useOrderSareeMutation } from "../../redux/state";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";

const ViewDetails = () => {
  const { id } = useParams();

  // ✅ ALL HOOKS AT TOP
  const { data, isLoading, isError } = useGetACardQuery(id);
  const [order] = useOrderSareeMutation();
  const [thumbline, setThumbline] = useState("");

  const saree = data?.saree;

  useEffect(() => {
    if (saree?.thumbline) {
      setThumbline(saree.thumbline);
    }
  }, [saree]);


  if (isLoading) {
    return <Loader/>;
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load data
      </div>
    );
  }

  const changeImage = (img) => {
    setThumbline(img);
  };

 const handlePopulate = async (id) => {
  console.log(id)
  try {
    const res = await order(id).unwrap();
    toast.success(res.message || "Added to cart successfully");
  } catch (err) {
    toast.error(err?.data?.message || "Failed to add to cart");
  }
};

  return (
    <section className="max-w-6xl mx-auto min-h-screen px-4 sm:px-6 py-8 sm:py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">

        {/* IMAGE */}
        <div className="w-full flex flex-col items-center gap-4">
          <img
            src={thumbline}
            alt={saree?.title}
            className="w-80 sm:max-w-md md:max-w-full object-cover rounded-xl shadow-lg"
          />

          <div className="flex flex-wrap justify-center gap-3">
            {saree?.images?.map((item, index) => (
              <button
                key={index}
                onClick={() => changeImage(item)}
                className={`h-20 w-16 sm:h-24 sm:w-20 rounded-md border-2 ${
                  thumbline === item
                    ? "border-[#e0531f]"
                    : "border-gray-300"
                }`}
              >
                <img src={item} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* DETAILS */}
        <div className="space-y-4 sm:space-y-5 flex flex-col h-100 justify-center">
          <h1 className="text-2xl sm:text-3xl font-bold">
            {saree?.title}
          </h1>

          <p className="text-gray-600">{saree?.description}</p>

          <span className="text-2xl font-semibold text-[#e0531f]">
            ₹{saree?.price}
          </span>

          <button
            onClick={() => handlePopulate(saree._id)}
            className="mt-4 bg-[#e0531f] hover:bg-[#c74718] text-white px-8 py-3 rounded-xl"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ViewDetails;
