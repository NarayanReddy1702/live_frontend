import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  useGetOneUserQuery,
  useUpdateAuthMutation,
} from "../../redux/state";

const UpdateUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const loggedUser = JSON.parse(localStorage.getItem("userDet") || "null");

  const { data, isLoading, isError } = useGetOneUserQuery(id);
  const [updateUser, { isLoading: updating }] = useUpdateAuthMutation();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "",
    gender: "",
  });

  useEffect(() => {
    if (data?.success && data?.userDet) {
      setFormData({
        fullName: data.userDet.fullName || "",
        email: data.userDet.email || "",
        role: data.userDet.role || "",
        gender: data.userDet.gender || "",
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

      toast.success(res.message);

      // update localStorage if self profile updated
      if (loggedUser?._id === id) {
        localStorage.setItem("userDet", JSON.stringify(res.user));
      }

      navigate("/admin");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update user");
    }
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load user data
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl">
        <h3 className="text-2xl font-semibold mb-6 text-center">
          Edit User Details
        </h3>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Role</label>
            <input
              name="role"
              value={formData.role}
              disabled
              className="input bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="col-span-2 flex justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="bg-black px-5 cursor-pointer py-2 rounded text-white font-semibold"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={updating}
             className="bg-blue-600 cursor-pointer px-5 py-2 rounded text-white font-semibold"
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
