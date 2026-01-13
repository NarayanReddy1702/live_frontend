// Navbar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";
import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../utils/AuthContext";
import { useLogoutMutation } from "../redux/state";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [fixed, setFixed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [logoutUser] = useLogoutMutation();
  const navigate = useNavigate();
  const { user, setToken, setUser } = useContext(AuthContext);
  const userDet = localStorage.getItem("userDet");

  const handleLogout = async () => {
    try {
      const data = await logoutUser().unwrap();
      if (data.success) {
        toast.success(data.message);
        localStorage.removeItem("userDet");
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.data?.message || "Logout failed");
    }
  };

  useEffect(() => {
    const onScroll = () => setFixed(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    `cursor-pointer text-sm font-medium transition ${
      isActive ? "text-red-500 font-semibold" : "text-gray-700 hover:text-red-500"
    }`;

  return (
    <nav
      className={`w-full bg-white z-50 px-5 py-3 flex items-center justify-between
      ${fixed ? "fixed top-0 shadow-md" : "sticky top-0"}`}
    >
      
      <img src="" alt="" />
      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-6">
        {user && userDet ? (
          <>
          <NavLink to="/" className={linkClass}>
        Home
      </NavLink>
            <NavLink
              to="/orders"
              className="cursor-pointer text-gray-700 hover:text-red-500"
            >
              <MdOutlineShoppingCart size={22} />
            </NavLink>

            <NavLink
              to="/profile"
              className="cursor-pointer flex items-center gap-2"
            >
              <img
                src={user.ProfilePic}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border"
              />
              <span className="text-sm font-medium text-gray-700 hover:text-red-500">
                {user.fullName}
              </span>
            </NavLink>

            <button
              onClick={handleLogout}
              className="cursor-pointer border border-black px-4 py-1.5 rounded-md text-sm font-semibold
              hover:bg-red-500 hover:text-white hover:border-red-500 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/register")}
              className="cursor-pointer border border-black px-4 py-1.5 rounded-md text-sm font-semibold
              hover:bg-red-500 hover:text-white hover:border-red-500 transition"
            >
              Sign Up
            </button>

            <button
              onClick={() => navigate("/login")}
              className="cursor-pointer bg-red-500 text-white px-4 py-1.5 rounded-md text-sm font-semibold
              hover:bg-transparent hover:text-black hover:border hover:border-black transition"
            >
              Sign In
            </button>
          </>
        )}
      </div>

      {/* MOBILE TOGGLE */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden cursor-pointer text-gray-700"
      >
        {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
      </button>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden border-t">
          <div className="flex flex-col gap-4 px-6 py-5">
            

            {user ? (
              <>
              <NavLink
              to="/"
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
                <NavLink
                  to="/orders"
                  className={linkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Orders
                </NavLink>

                <NavLink
              to="/profile"
              className="cursor-pointer flex items-center gap-2"
            >
              <img
                src={user.ProfilePic}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border"
              />
              <span className="text-sm font-medium text-gray-700 hover:text-red-500">
                {user.fullName}
              </span>
            </NavLink>

                <button
              onClick={handleLogout}
              className="cursor-pointer border border-black px-4 py-1.5 rounded-md text-sm font-semibold
              hover:bg-red-500 hover:text-white hover:border-red-500 transition"
            >
              Logout
            </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/register")}
                  className="cursor-pointer text-left hover:text-red-500"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="cursor-pointer text-left hover:text-red-500"
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
