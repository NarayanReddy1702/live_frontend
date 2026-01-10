import React, { useContext, useState } from 'react'
import { MdOutlineRemoveRedEye } from 'react-icons/md';

import { LuEyeClosed } from 'react-icons/lu';

import { NavLink, useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';

import { useLoginMutation } from '../../redux/state';
import { AuthContext } from '../../utils/AuthContext';


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
   const { user, token, setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate()
   const [formData, setFormData] = useState({
     email: "",
     password: ""
   });

  const [loginUser,{isLoading,isSuccess,error}]=useLoginMutation()

   const handleEye = () => {
     setShowPassword((prev) => !prev);
   };
 
 
   const handleChange =(e)=>{
      setFormData({...formData,[e.target.name]:e.target.value})
   }
 
   const handleSubmit =async (e)=>{
    e.preventDefault()
    try {
      const data = await loginUser(formData).unwrap()
      if(data.success){
        toast.success(data.message)
        setFormData({
          email:'',
          password:''
        })
        setToken(data?.token)
        setUser(data?.user)
        setTimeout(()=>{
         navigate("/")
        },1000)
        localStorage.setItem("userDet",JSON.stringify(data.user))
        localStorage.setItem("token",data?.token)
      }else {
      toast.error(data?.message);
    }
      
    } catch (error) {
      const errorMessage = error?.data?.message || "Something Went Wrong !"
      toast.error(errorMessage)
    }
   }
 
 
   return (
    <div
       style={{
        backgroundImage:
          "linear-gradient(to bottom right, black, #140a05, black)",
      }}
      className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
    >
   

      {/* Glass Card */}
      <div
        className="relative z-10 w-full max-w-md rounded-2xl p-0.5"
        style={{
          backgroundImage:
            "linear-gradient(to bottom right, rgba(255,255,255,0.25), rgba(255,255,255,0.05))",
        }}
      >
        <div
          className="rounded-2xl p-8
          bg-white/10 backdrop-blur-2xl
          border border-white/20
          shadow-[0_25px_80px_rgba(0,0,0,0.85)]"
        >
          <h2 className="text-3xl font-serif text-center text-[#e0531f] mb-2">
            Welcome Back
          </h2>
          <p className="text-center text-gray-300 mb-6">
            Login to Saree Premium
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="w-full px-4 py-2 rounded-xl
              bg-white/20 text-white placeholder-gray-300
              border border-white/30
              focus:outline-none focus:ring-2 focus:ring-[#e0531f]
              backdrop-blur-md"
              placeholder="Enter email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          <div className="relative">
  <input
    className="
      w-full px-4 py-2 pr-14
      rounded-xl
      bg-white/20 text-white placeholder-gray-300
      border border-white/30
      focus:outline-none focus:ring-2 focus:ring-[#e0531f]
      backdrop-blur-md
    "
    placeholder="Enter password"
    type={showPassword ? "text" : "password"}
    name="password"
    value={formData.password}
    onChange={handleChange}
    required
  />

  <button
    type="button"
    onClick={handleEye}
    className="
      absolute right-4 top-1/2 -translate-y-1/2
      flex items-center justify-center
      w-7 h-7
      text-white/80
      hover:text-[#e0531f]
      transition
    "
  >
   {showPassword? <MdOutlineRemoveRedEye
      size={18}
      
    />:<LuEyeClosed size={18} />}
  </button>
</div>



            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl
              bg-[#e0531f] text-white font-semibold
              hover:bg-[#c94718] transition"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-300 mt-6">
            Don't have an account?{" "}
            <NavLink
              to="/register"
              className="text-[#e0531f] font-semibold"
            >
              Register
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
 
}

export default Login