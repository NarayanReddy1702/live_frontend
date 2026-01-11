import React, { useState } from "react";
import { useDoLikeMutation, useOrderSareeMutation } from "../redux/state";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SareeCard = ({item}) => {
  
  const [likes, setLikes] = useState(item.like.length || 0);
  const [addCard]=useDoLikeMutation()
  const navigate = useNavigate()

  const handleLike = async  (sareeId) => {
    console.log(sareeId)
    try {
    const res = await addCard(sareeId).unwrap();
    setLikes(item.like.length)
    if (res.success) {
      toast.success(res.message);
      console.log(res.sareeItem);
    } else {
      toast.error(res.message || "Failed to do Like");
    }
  } catch (err) {
    const message =
      err?.data?.message ||
      err?.error ||
      err?.message ||
      "Something went wrong";
    toast.error(message);
  }
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


const handleViewDet=(id)=>{
  console.log(id)
  navigate(`/viewDet/${id}`)
}

  console.log(item)
  return (
    <div  className="group relative w-70 bg-white rounded-xl overflow-hidden transition-shadow duration-300 hover:shadow-2xl">

      {/* IMAGE */}
      <img
      onClick={()=>handleViewDet(item._id)}
        src={item.thumbline}
        alt="Saree"
        className="w-full h-95 object-cover"
      />

      {/* HEART WITH COUNT */}
      <button
        onClick={()=>handleLike(item._id)}
        className="absolute top-4 right-4 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md z-10 hover:scale-110 transition-transform"
      >
        <span className="text-lg">❤️</span>

        {likes > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#e0531f] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
            {likes}
          </span>
        )}
      </button>

      {/* HOVER POPUP */}
      <div
        className="
          absolute bottom-0 left-0 w-full
          bg-zinc-950/35 px-4 py-4
          translate-y-full
          group-hover:translate-y-0
          transition-all duration-500 ease-out
          shadow-[0_-12px_25px_rgba(0,0,0,0.15)]
        "
      >
        <h3 className="text-sm font-semibold text-gray-100">
          {item.title}
        </h3>

        <p className="text-xs text-gray-500 mt-1">
          {item.description}
        </p>

        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="text-lg font-bold text-[#e0531f]">{item.price}</span>
            <span className="text-xs text-gray-400 line-through ml-2">
              ₹4,599
            </span>
          </div>

          <button onClick={()=>handlePopulate(item._id)} className="bg-[#e0531f] z-50 cursor-pointer hover:bg-[#c74718] text-white text-xs px-4 py-2 rounded-lg transition">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SareeCard;
