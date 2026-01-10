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
    role: "",
    gender: "",
  });

  useEffect(() => {
    if (data?.success) {
      console.log(data?.userDet)
      setFormData({
        fullName: data.userDet?.fullName || "",
        email: data.userDet?.email || "",
        role: data.userDet?.role || "",
        gender: data.userDet?.gender || "",
      });
    }
  }, [data]);

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUser({
        id,
        data: formData,
      }).unwrap();

      if (res.success) {
        toast.success(res.message);

        // ✅ Update localStorage if self update
        if (loggedUser?._id === id) {
          localStorage.setItem("userDet", JSON.stringify(res.user));
        }

        navigate("/admin");
      }
    } catch (error) {
      toast.error("Failed to update user");
    }
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl">
        <h3 className="text-2xl font-semibold mb-6 text-center">
          Edit Admin Details
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
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Role</label>
            <input
              value={formData.role}
              disabled
              className="input bg-gray-100"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="col-span-2 flex justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="btn-secondary"
            >
              Cancel
            </button>

            <button type="submit" disabled={updating} className="btn-primary">
              {updating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEdit;
