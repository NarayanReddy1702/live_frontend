// Navbar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";
import toast from "react-hot-toast";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../utils/AuthContext";
import { useLogoutMutation } from "../redux/state";

  import { HiMenu, HiX } from "react-icons/hi";
 
const Navbar = () => {
  const [fixed, setFixed] = useState(0);
  const [logoutUser, { isLoading, isSuccess, error }] = useLogoutMutation();
  const navigate = useNavigate();
  const { user, setToken, setUser } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
 const userDet =localStorage.getItem("userDet")

  const handleLogout = async () => {
    try {
      const data = await logoutUser().unwrap();
      if (data.success) {
        toast.success(data?.message);
        localStorage.removeItem("userDet");
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error.data?.message);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setFixed(Math.floor(window.scrollY));
    });
  }, [fixed]);

  return (
    <nav
      className={`w-full bg-white shadow-md px-4 py-2 z-50
  flex items-center justify-between
  ${fixed > 0 ? "fixed transition duration-200" : "sticky"}`}
    >
      {/* Left - Logo / Links */}
      <div className="flex items-center space-x-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-gray-700 hover:text-red-500 ${
              isActive ? "font-semibold text-red-500" : ""
            }`
          }
        >
          Home
        </NavLink>

        
      </div>

     
      <div className="hidden md:flex items-center space-x-4">
        {(user && userDet)? (
          <>
            <NavLink to="/orders" className="text-gray-700 hover:text-red-500">
              <MdOutlineShoppingCart size={24} />
            </NavLink>

            <NavLink to="/profile" className="flex items-center space-x-2">
              <img
                src="./Profile.png"
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-gray-700 hover:text-red-500 font-medium">
                {user.fullName}
              </span>
            </NavLink>

            <button
              onClick={handleLogout}
              className="text-black font-semibold rounded-md px-3 py-1
          border border-black hover:bg-red-500 hover:text-white hover:border-red-500"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/register")}
              className="border border-black px-3 py-1 rounded-md font-semibold
          hover:bg-red-500 hover:text-white hover:border-red-500"
            >
              SignUp
            </button>

            <button
              onClick={() => navigate("/login")}
              className="bg-red-500 text-white px-3 py-1 rounded-md font-semibold
          hover:bg-transparent hover:text-black hover:border hover:border-black"
            >
              SignIn
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-gray-700"
      >
        {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden">
          <div className="flex flex-col px-6 py-4 space-y-4">
            <NavLink to="/" onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>

            {user ? (
              <>
                <NavLink to="/orders" onClick={() => setMenuOpen(false)}>
                  Orders
                </NavLink>

                <NavLink to="/profile" onClick={() => setMenuOpen(false)}>
                  Profile
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="text-left font-semibold text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={() => navigate("/register")}>SignUp</button>
                <button onClick={() => navigate("/login")}>SignIn</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
