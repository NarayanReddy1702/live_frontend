import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetACardQuery, useOrderSareeMutation } from "../../redux/state";

const ViewDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetACardQuery(id);

  const [thumbline, setThumbline] = useState("");

  const saree = data?.saree;

  // ✅ FIX
  useEffect(() => {
    if (saree?.thumbline) {
      setThumbline(saree.thumbline);
    }
  }, [saree]);

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
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
  const [order] = useOrderSareeMutation();
  
  const handlePopulate = (id) => {
    console.log(id)
    try {
      const userDet = localStorage.getItem("userDet"); // get from storage
      if (!userDet) return console.error("User not found");
  
      const { _id } = JSON.parse(userDet);
      console.log("User ID:", _id);
  
      // Call the mutation with saree id and userId
      order({ id, userId: _id })
        .unwrap()
        .then((res) => {
          console.log("Cart updated:", res.cart);
        })
        .catch((err) => {
          console.error("Error adding to cart:", err);
        });
    } catch (error) {
      console.error("Parsing error:", error);
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
            className="
              w-80
              max-w-sm
              sm:max-w-md
              md:max-w-full
              h-65
              sm:h-80
              md:h-105
              object-cover
              rounded-xl
              shadow-lg
            "
          />

          {/* THUMBNAILS */}
          <div className="flex flex-wrap justify-center gap-3">
            {saree?.images?.map((item, index) => (
              <button
                key={index}
                onClick={() => changeImage(item)}
                className={`
                  h-20 w-16 sm:h-24 sm:w-20
                  overflow-hidden
                  rounded-md
                  border-2
                  transition
                  ${
                    thumbline === item
                      ? "border-[#e0531f]"
                      : "border-gray-300"
                  }
                `}
              >
                <img
                  src={item}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* DETAILS */}
        <div className="space-y-4  h-100 sm:space-y-5 flex flex-col justify-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {saree?.title}
          </h1>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            {saree?.description}
          </p>

          <div className="flex items-center gap-4">
            <span className="text-2xl font-semibold text-[#e0531f]">
              ₹{saree?.price}
            </span>

            {saree?.like && (
              <span className="text-sm text-gray-500">
                Likes: {saree.like.length}
              </span>
            )}
          </div>

          <div className="text-sm text-gray-500">
            Category:{" "}
            <span className="font-medium text-gray-700">
              {saree?.category}
            </span>
          </div>

          <button
            className="
              mt-4
              w-full
              sm:w-auto
              bg-[#e0531f]
              hover:bg-[#c74718]
              text-white
              px-8
              py-3
              rounded-xl
              font-medium
              transition
            "
            onClick={()=>handlePopulate(saree._id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ViewDetails;
