import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore.js";
import { Link } from "react-router-dom";
import { useState } from "react";

function LoginPage() {
  const [showPassword, setShowPassword ] = useState(false);
  const { login, isLoggingIn } = useAuthStore();

  const [FormData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    if (!FormData.email || !FormData.password) {
      return toast.error("please fill all details");
      
    }
    if (!FormData.email.includes("@")) {
      return toast.error("please enter valid email");
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      await login(FormData);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#1D1616]">
      <div className="bg-[#2C2222] p-8 rounded-lg shadow-lg w-full max-w-md text-[#EEEEEE]">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-[#D84040] mb-6">
          Login
        </h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={FormData.email}
              onChange={(e) =>
                setFormData({ ...FormData, email: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg bg-[#3B2E2E] text-white focus:outline-none focus:ring-2 focus:ring-[#D84040]"
            />
          </div>

          {/* Password Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-[#EEEEEE]">
                Password
              </span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full bg-[#EEEEEE] text-black"
                placeholder="••••••••"
                value={FormData.password}
                onChange={(e) =>
                  setFormData({ ...FormData, password: e.target.value })
                }
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-black"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn w-full bg-[#8E1616] text-white hover:bg-[#D84040]"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Loading..." : "Login"}
          </button>
        </form>

        {/* Signup Link */}
        <div className="text-center">
          <p className="text-[#EEEEEE]/60">
          Dont have an account? ?{" "}
            <Link to="/signup" className="text-[#D84040] hover:underline">
              SignUP
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
