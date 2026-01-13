import { useState } from "react";
import { useRegisterMutation } from "../../redux/state";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
 const [createUser,{isLoading,error}]= useRegisterMutation()
 const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(formData)
  try {
    const register = await createUser(formData).unwrap();

    if (register.success) {
      toast.success(register.message);
      setFormData({
        fullName: "",
        email: "",
        password: "",
        role:""
      });
      setTimeout(()=>{
        navigate("/login")
      },1000)
    } else {
      toast.error(register.message);
    }
  } catch (error) {
    const errorMessage =
      error?.data?.message ||

      "Something went wrong";

    toast.error(errorMessage);
  }
};
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(to bottom right, black, #140a05, black)",
      }}
      className="min-h-screen flex items-center justify-center px-4"
    >
      <div className="w-full max-w-md rounded-2xl p-8 bg-white/10 backdrop-blur-2xl border border-white/20">
        <h2 className="text-3xl text-center text-[#e0531f] mb-2">
          Create Account
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Join Saree Premium
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:ring-2 focus:ring-[#e0531f]"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:ring-2 focus:ring-[#e0531f]"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:ring-2 focus:ring-[#e0531f]"
          />

          {/* Gender */}
        
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-xl bg-white/20 text-white border border-white/30 focus:ring-2 focus:ring-[#e0531f]"
          >
            <option value="" className="text-black">
              Select Role
            </option>
            <option value="user" className="text-black">
              User
            </option>
            <option value="admin" className="text-black">
              Admin
            </option>
          </select>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#e0531f] text-white font-semibold hover:bg-[#c94718] transition"
          >
            Register
          </button>
        </form>

        <p onClick={()=>navigate("/login")} className="text-center text-sm text-gray-300 mt-6">
          Already have an account?{" "}
          <span  className="text-[#e0531f] font-semibold cursor-pointer">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
