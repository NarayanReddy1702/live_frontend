import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {

    const user = JSON.parse(localStorage.getItem("userDet"))
    const navigate = useNavigate()
  return (
    <div className="flex justify-center px-5 items-center min-h-screen ">
  <div style={{
  backgroundImage: "linear-gradient(to bottom right, black, #140a05, black)"
}} className="bg-gray-900/70 backdrop-blur-xl  from-gray-900 via-gray-800 to-gray-950 p-4 rounded-2xl shadow-2xl w-full max-w-md  border border-gray-800">
    {/* Profile Header */}
    <div className="flex flex-col items-center">
      <div className="relative">
        <img
          src={user.ProfilePic}
          alt="User Avatar"
          className="w-32 h-32 rounded-full border-4 border-orange-500 shadow-lg object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-orange-500 p-2 rounded-full shadow-md hover:scale-105 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13h3l8-8a2.121 2.121 0 10-3-3l-8 8v3z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 21H4a1 1 0 01-1-1v-4a1 1 0 011-1h4" />
          </svg>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-4 text-white tracking-wide">
        {user.fullName}
      </h2>
      <p className="text-gray-400 text-sm mt-1">{user.email}</p>
    </div>

    {/* Divider */}
    <div className="w-full border-t border-gray-700 my-6"></div>

    {/* Info Section */}
    <div className="flex flex-col items-center gap-2 text-gray-300 text-sm">
      <p><span className="font-semibold text-orange-400">Role:</span> {user.role}</p>
      <p><span className="font-semibold text-orange-400">Gender:</span> {user.gender}</p>
    </div>

    {/* Action Buttons */}
    <div className="flex flex-col md:flex-row gap-4 mt-8">
      <button
        onClick={() => navigate(`/updateUser/${user._id}`)}
        className="flex-1 cursor-pointer bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-lg font-semibold shadow-md transition"
      >
        Edit Profile
      </button>

      <button
        onClick={() => navigate("/")}
        className="flex-1 cursor-pointer bg-gray-700 hover:bg-gray-600 text-white py-2.5 rounded-lg font-semibold shadow-md transition"
      >
        Back to Home
      </button>
    </div>
  </div>
</div>

  );
};

export default Profile;
