import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  useGetOneUserQuery,
  useUpdateAuthMutation,
} from "../../redux/state";
import { AuthContext } from "../../utils/AuthContext";

const UpdateUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const loggedUser = JSON.parse(localStorage.getItem("userDet") || "null");

  const { data, isLoading, isError } = useGetOneUserQuery(id);
  const [updateUser, { isLoading: updating }] = useUpdateAuthMutation();
const { user, setToken, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    if (data?.success && data?.userDet) {
      setFormData({
        fullName: data.userDet.fullName || "",
        email: data.userDet.email || "",
        role: data.userDet.role || "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUser({
        id,
        data: formData,
      }).unwrap();

     if(res.success){
       toast.success(res.message);
      localStorage.setItem("userDet",JSON.stringify(res.user))
      setUser(res.user)
     }
      if (loggedUser?._id === id) {
        localStorage.setItem("userDet", JSON.stringify(res.user));
      }

      navigate("/admin");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update user");
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load user data
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-6 sm:py-12">
      <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8 w-full max-w-3xl">
        <h3 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">
          Edit User Details
        </h3>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
        >
          {/* Full Name */}
          <div className="w-full">
            <label className="block font-medium mb-1">Full Name</label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="input w-full"
              placeholder="Enter full name"
              required
            />
          </div>

          {/* Email */}
          <div className="w-full">
            <label className="block font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="input w-full"
              placeholder="Enter email"
              required
            />
          </div>

          {/* Role */}
          <div className="w-full">
            <label className="block font-medium mb-1">Role</label>
            <input
              name="role"
              value={formData.role}
              disabled
              className="input w-full bg-gray-100 cursor-not-allowed"
            />
          </div>


          {/* Buttons */}
          <div className="col-span-1 sm:col-span-2 flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="bg-black px-5 py-2 rounded text-white font-semibold w-full sm:w-auto"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={updating}
              className="bg-blue-600 px-5 py-2 rounded text-white font-semibold w-full sm:w-auto"
            >
              {updating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
