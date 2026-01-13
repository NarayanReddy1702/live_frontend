import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("userDet"));
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        User not found
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
      {/* Profile Card */}
      <div
        style={{
          backgroundImage:
            "linear-gradient(to bottom right, #0f0f0f, #1a0b05, #0f0f0f)",
        }}
        className="w-full max-w-md rounded-2xl border border-white/10
        shadow-2xl backdrop-blur-xl p-6"
      >
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={user.ProfilePic}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover
              border-4 border-orange-500 shadow-lg"
            />

            {/* Edit Icon */}
            <button
              className="absolute bottom-1 right-1 cursor-pointer
              bg-orange-500 hover:bg-orange-600 transition
              text-white p-2 rounded-full shadow-md"
              title="Edit Profile Picture"
            >
              ✎
            </button>
          </div>

          <h2 className="mt-4 text-xl font-semibold text-white tracking-wide">
            {user.fullName}
          </h2>
          <p className="text-sm text-gray-400">{user.email}</p>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-6"></div>

        {/* Info */}
        <div className="text-center text-sm text-gray-300 space-y-1">
          <p>
            <span className="text-orange-400 font-medium">Role:</span>{" "}
            {user.role}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={() => navigate(`/updateUser/${user._id}`)}
            className="cursor-pointer w-full bg-orange-500 hover:bg-orange-600
            text-white py-2.5 rounded-lg font-semibold transition"
          >
            Edit Profile
          </button>

          <button
            onClick={() => navigate("/")}
            className="cursor-pointer w-full bg-white/10 hover:bg-white/20
            text-white py-2.5 rounded-lg font-semibold transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
