import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password) {
      return toast.error("Yo! Fill in all details.");
    }
    if (!formData.email.includes("@")) {
      return toast.error("Ayo, drop a valid email!");
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm() === true) {
      toast.success("Welcome to the fam! 🎉");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-[#FCA311]">
      <div className="bg-opacity-20 backdrop-blur-lg p-8 rounded-lg shadow-2xl w-full max-w-md text-white border border-gray-700">
        {/* Header */}
        <h2 className="text-4xl font-extrabold text-center text-[#FCA311] mb-6 animate-pulse">
          Sign Up 🚀
        </h2>
        <p className="text-center text-gray-400 text-sm italic mb-6">
          "Welcome to the chaos-coded brilliance of AH.🖤"
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              placeholder="Pick your alias, legend"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-[#FCA311] transition-shadow shadow-lg hover:shadow-[#FCA311]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Drop your email, fam"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-[#FCA311] transition-shadow shadow-lg hover:shadow-[#FCA311]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white  focus:ring-[#FCA311] transition-shadow shadow-lg hover:shadow-[#FCA311]"
                placeholder="Make it hacker-proof"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-[#FCA311] text-black font-semibold hover:bg-[#ffbe3d] transition-transform transform hover:scale-105 shadow-lg"
          >
            Create Account & Enter the Matrix ⚡
          </button>
        </form>

        {/* Login Redirect */}
        <div className="text-center mt-4">
          <p className="text-gray-400">
            Already vibing here? 
            <Link to="/login" className="text-[#FCA311] hover:underline ml-1 transition-all hover:text-[#ffbe3d]">
              Log in & Reconnect 🖤
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
