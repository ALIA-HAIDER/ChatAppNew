import { useState } from "react";
import {useAuthStore} from "../store/useAuthStore.js";
import {Link} from "react-router-dom";
import toast from "react-hot-toast";

function SignupPage() {
    const [showPassword,setPassword]=useState(false);

    const [FormData,setFormData]=useState({
        fullName:"",
        email:"",
        password:"",
    });

    // const [showPassword,setShowPassword]=useState(false);

    const {signup,isSigningUp}=useAuthStore();

    const validateForm=()=>{
        if(!FormData.fullName || !FormData.email || !FormData.password){
            return toast.error("please fill all details");
        }if(!FormData.email.includes("@")){
            return toast.error("please enter valid email");
        }if(FormData.password.length<6){
            return toast.error("password must be at least 6 characters long");
        }
        return true;
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const success = validateForm();
        if(success===true){
            await signup(FormData);
        }
    }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#1D1616] text-[#EEEEEE]">
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-[#8E1616] flex items-center justify-center group-hover:bg-[#D84040] transition-colors">
                <span className="text-2xl font-bold">💬</span>
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-[#EEEEEE]/60">Get started with your free account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-[#EEEEEE]">Full Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-[#EEEEEE] text-black"
                placeholder="John Doe"
                value={FormData.fullName}
                onChange={(e) => setFormData({ ...FormData, fullName: e.target.value })}
              />
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-[#EEEEEE]">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full bg-[#EEEEEE] text-black"
                placeholder="you@example.com"
                value={FormData.email}
                onChange={(e) => setFormData({ ...FormData, email: e.target.value })}
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-[#EEEEEE]">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full bg-[#EEEEEE] text-black"
                  placeholder="••••••••"
                  value={FormData.password}
                  onChange={(e) => setFormData({ ...FormData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-black"
                  onClick={() => setPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn w-full bg-[#8E1616] text-white hover:bg-[#D84040]" disabled={isSigningUp}>
              {isSigningUp ? "Loading..." : "Create Account"}
            </button>
          </form>

          <div className="text-center">
            <p className="text-[#EEEEEE]/60">
              Already have an account? <Link to="/login" className="text-[#D84040] hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-[#8E1616] text-[#EEEEEE] p-12">
        <h2 className="text-3xl font-bold">Join our community</h2>
        <p className="mt-2">Connect with friends, share moments, and stay in touch.</p>
      </div>
    </div>
  )
}

export default SignupPage