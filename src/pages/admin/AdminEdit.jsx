import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useGetOneUserQuery, useUpdateAuthMutation } from "../../redux/state";

const AdminEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const loggedUser = JSON.parse(localStorage.getItem("userDet"));

  const { data, isLoading } = useGetOneUserQuery(id);
  const [updateUser, { isLoading: updating }] = useUpdateAuthMutation();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: ""
  });

  useEffect(() => {
    if (data?.success) {
      setFormData({
        fullName: data.userDet?.fullName || "",
        email: data.userDet?.email || "",
        role: data.userDet?.role || "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUser({ id, data: formData }).unwrap();
      if (res.success) {
        toast.success(res.message);
        if (loggedUser?._id === id) {
          localStorage.setItem("userDet", JSON.stringify(res.user));
        }
        navigate("/admin");
      }
    } catch {
      toast.error("Failed to update user");
    }
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-3 sm:px-6">
      <div className="bg-white shadow-lg rounded-xl p-5 sm:p-8 w-full max-w-3xl">
        <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
          Edit Admin Details
        </h3>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
        >
          {/* Full Name */}
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="input w-full"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input w-full"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block font-medium mb-1">Role</label>
            <input
              value={formData.role}
              disabled
              className="input w-full bg-gray-100"
            />
          </div>


          {/* Buttons */}
          <div className="col-span-1 md:col-span-2 flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="bg-black w-full sm:w-auto px-6 py-2 rounded text-white font-semibold"
            >
              Cancel
            </button>

            <button
              disabled={updating}
              className="bg-blue-600 w-full sm:w-auto px-6 py-2 rounded text-white font-semibold disabled:opacity-50"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEdit;
