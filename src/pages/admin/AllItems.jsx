import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useDeleteCardMutation, useGetAllSareeQuery } from "../../redux/state";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";

const UserAdmin = () => {
  const navigate = useNavigate();
  const [allItems, setAllItems] = useState([]);

  const { data, isLoading, error } = useGetAllSareeQuery();
  const [deleteItem, { isLoading: loading, error: isError }] =
    useDeleteCardMutation();
  useEffect(() => {
    if (data) {
      if (data.success) {
        setAllItems(data.saree || []);
        console.log("Fetched user data successfully!");
      } else {
        console.log("Failed to fetch user data");
      }
    }

    if (error) {
      console.log("Error fetching users");
      console.error(error);
    }
  }, [data, error]);

  console.log(allItems);
  const handleDelete = async (id) => {
    try {
      if (!id) return toast.error("Invalid ID");

      const isConfirmed = window.confirm(
        "Are you sure you want to delete this item?"
      );

      if (!isConfirmed) return;

      const res = await deleteItem(id).unwrap();
      
      if (res?.success) {
        toast.success(res.message || "Item deleted successfully");

        setAllItems((prev) => prev.filter((item) => item._id !== id));
      } else {
        toast.error(res?.message || "Failed to delete item");
      }
    } catch (error) {
      toast.error(
        error?.data?.message || "Something went wrong while deleting"
      );
      console.error("Delete Error:", error);
    }
  };

  if (isLoading) {
    return (
      <Loader/>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* HEADER */}
        <div className="w-full px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Saree List</h2>
        </div>

        {allItems.length > 0 ? (
          <>
        
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3 text-left">SI No</th>
                    <th className="px-6 py-3 text-left">Title</th>
                    <th className="px-6 py-3 text-left">Description</th>
                    <th className="px-6 py-3 text-left">Price</th>
                    <th className="px-6 py-3 text-left">Category</th>
                    <th className="px-6 py-3 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {allItems.map((item, index) => (
                    <tr
                      key={item._id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4 font-medium">{item.title}</td>
                      <td className="px-6 py-4 line-clamp-2">
                        {item.description}
                      </td>
                      <td className="px-2 py-4 font-semibold text-[#e0531f]">
                        <span>₹ </span>
                        <span>{item.price}</span>
                      </td>
                      <td className="px-6 py-4">{item.category}</td>

                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-3">
                          <button className="flex items-center gap-2 px-3 py-1 rounded-md bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                            <FaEdit />
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(item._id)}
                            className="flex items-center gap-2 px-3 py-1 rounded-md bg-red-100 text-red-700 hover:bg-red-200"
                          >
                            <FaTrash />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          
            <div className="md:hidden space-y-4 p-4">
              {allItems.map((item, index) => (
                <div
                  key={item._id}
                  className="border rounded-lg p-4 shadow-sm bg-gray-50"
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-gray-500">#{index + 1}</span>
                    <span className="text-sm font-semibold text-[#e0531f]">
                      ₹ {item.price}
                    </span>
                  </div>

                  <h3 className="font-semibold text-gray-800">{item.title}</h3>

                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {item.description}
                  </p>

                  <p className="text-xs mt-2 text-gray-500">
                    Category:{" "}
                    <span className="font-medium">{item.category}</span>
                  </p>

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => navigate(`/admin/userEdit/${item._id}`)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-yellow-100 text-yellow-800"
                    >
                      <FaEdit />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-red-100 text-red-700"
                    >
                      <FaTrash />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center py-10">
            <h1 className="text-gray-500">There is no data yet!</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAdmin;
