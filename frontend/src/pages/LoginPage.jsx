import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore.js";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoggingIn } = useAuthStore();

  const [FormData, setFormData] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    if (!FormData.email || !FormData.password) {
      return toast.error("Bruh, fill in all the deets 😤");
    }
    if (!FormData.email.includes("@")) {
      return toast.error("That ain't a real email fam 🤨");
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm() === true) {
      await login(FormData);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-[#FCA311] text-white">
      <div className="bg-opacity-25 backdrop-blur-lg p-10 rounded-xl shadow-2xl w-full max-w-md border border-gray-700 neon-border">
        {/* Animated Title */}
        <h2 className="text-5xl font-extrabold text-center text-[#FCA311] mb-6 animate-pulse tracking-wide uppercase">
          Welcome Back, Boss!
        </h2>
        <p className="text-center text-gray-400 mb-6 italic">
          "Access granted to the real ones only."
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={FormData.email}
              onChange={(e) => setFormData({ ...FormData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-[#FCA311] transition-shadow shadow-lg hover:shadow-[#FCA311]"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-[#FCA311] transition-shadow shadow-lg hover:shadow-[#FCA311]"
                placeholder="••••••••"
                value={FormData.password}
                onChange={(e) => setFormData({ ...FormData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-[#FCA311] text-black font-bold text-lg hover:bg-[#ffbe3d] transition-transform transform hover:scale-105 shadow-lg hover:shadow-[#FCA311]"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Loading... ⏳" : "Login & Enter the Matrix"}
          </button>
        </form>

        {/* Signup Link */}
        <div className="text-center mt-6">
          <p className="text-gray-400">
            New here? 
            <Link to="/signup" className="text-[#FCA311] hover:underline ml-1 transition-all hover:text-[#ffbe3d] font-semibold">
              Join the gossip 🚀
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
