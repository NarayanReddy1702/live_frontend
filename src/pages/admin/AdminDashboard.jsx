import React, { useState } from "react";
import {
  FaBars,
  FaHome,
  FaUsers,
  FaChartPie,
  FaSignOutAlt,
} from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../utils/AuthContext";
import { AiOutlinePlus } from "react-icons/ai";


function AdminDashboard() {
  const {user,token}=useContext(AuthContext)
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("userDet");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Admin Logout Successfully!");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-hidden">
      
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 text-white transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="mt-6 px-3 space-y-3">
          <Link
            to="/admin"
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 py-2 px-4 rounded-lg ${
              isActive("/admin") ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            <FaHome /> Home
          </Link>


        <Link
            to="/admin/addItem"
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 py-2 px-4 rounded-lg ${
              isActive("/admin/addItem") ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            <AiOutlinePlus /> Add Items
          </Link>

          <Link
            to="/admin/users"
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 py-2 px-4 rounded-lg ${
              isActive("/admin/users") ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            <FaUsers /> Users
          </Link>

          <Link
            to="/admin/allItems"
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 py-2 px-4 rounded-lg ${
              isActive("/admin/allItems") ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            <FaChartPie /> All Sarees
          </Link>

          <Link
            to="/admin/profile"
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 py-2 px-4 rounded-lg ${
              isActive("/admin/profile") ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            <GrUserAdmin /> Admin Profile
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 py-2 px-4 mt-8 rounded-lg bg-red-500 hover:bg-red-600 transition w-full"
          >
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </div>

     
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      
      <div className="flex-1 flex flex-col w-full">
        {/* Top Navbar */}
        <div className="flex items-center justify-between bg-gray-200 shadow-md px-4 py-3 md:px-6">
          <button
            className="text-gray-600 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars size={24} />
          </button>

          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            Dashboard
          </h2>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-gray-700 font-medium">
              {user?.fullName}
            </span>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-gray-400">
              <img
                src={user?.ProfilePic || "./Profile.jpg"}
                alt="Profile"
                onClick={() => navigate("/admin/profile")}
                className="w-full h-full object-cover cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* 🔥 Nested Route Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
