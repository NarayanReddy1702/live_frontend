import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDeleteUserMutation, useGetAllUsersQuery } from '../../redux/state';


const BASE_URL = "YOUR_API_BASE_URL"; // replace with your API base

const UserAdmin = () => {
  const navigate = useNavigate();
  const [allUser, setAllUser] = useState([]);

  // RTK Query hook
  const { data, isLoading, error } = useGetAllUsersQuery();
  const [deleteUser]=useDeleteUserMutation()
  useEffect(() => {
    if (data) {
      if (data.success) {
        setAllUser(data.users || []); // set your users array
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

  console.log(allUser)
  const handleDelete = async (id) => {
    try {
      const isConfirmed = window.confirm(`Do you want to delete this user with ID: ${id}?`);

      if (isConfirmed) {
       const res = await deleteUser(id).unwrap()

        if (res.success) {
          toast.success(res.message);
          // Remove deleted user from state
          setAllUser(prev => prev.filter(user => user._id !== id));
        } else {
          toast.error(res.message || "Failed to delete user");
        }
      }
    } catch (error) {
      toast.error("Failed to delete user");
      console.error(error);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center py-10">Loading users...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {allUser.length > 0 ? (
          <>
            <div className="w-full px-6 py-4 border-b">
              <h2 className="text-lg font-semibold text-gray-800">Users List</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3 text-left">SI No</th>
                    <th className="px-6 py-3 text-left">FullName</th>
                    <th className="px-6 py-3 text-left">Email</th>
                    <th className="px-6 py-3 text-left">Role</th>
                    <th className="px-6 py-3 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {allUser.map((user, index) => (
                    <tr
                      key={user._id}
                      className="border-t hover:bg-gray-50 transition duration-150"
                    >
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4 font-medium">{user.fullName}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.role === "admin"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => navigate(`/admin/userEdit/${user._id}`)}
                            className="flex items-center cursor-pointer gap-2 px-3 py-1 rounded-md bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition"
                          >
                            <FaEdit />
                            <span className="hidden sm:inline">Edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="flex items-center gap-2 px-3 cursor-pointer py-1 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition"
                          >
                            <FaTrash />
                            <span className="hidden sm:inline">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="justify-center flex items-center py-7">
            <h1>There is no data yet!</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAdmin;
