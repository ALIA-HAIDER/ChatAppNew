import { useState } from "react";
import { Link } from "react-router-dom";
import { FiSettings, FiLogIn, FiLogOut, FiUser } from "react-icons/fi";
import { MdMenu, MdClose } from "react-icons/md";
import { useAuthStore } from "../store/useAuthStore.js";
import { useEffect } from "react";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { authUser, checkAuth } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);


  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(authUser ? await logout() : null){
      console.log("Logged out successfully");
    }}

  return (
    <nav className="bg-[#1D1616] text-[#EEEEEE] shadow-md px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left: App Name */}
        <Link to="/" className="text-2xl font-bold font-sans text-[#D84040]">
          ShadowOrachle
        </Link>

        {/* Right: Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Settings */}
          <Link
            to="/settings"
            className="flex items-center gap-2 hover:text-[#D84040] transition"
          >
            <FiSettings size={20} />
            <span>Settings</span>
          </Link>

          {/* Profile Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2 hover:text-[#D84040] transition">
              <FiUser size={20} />
              <span>Profile</span>
            </button>
            <div className="absolute right-0 mt-2 w-36 bg-[#2C2222] shadow-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-[#D84040] rounded-t-lg"
              >
                View Profile
              </Link>
              <Link
                to="/edit-profile"
                className="block px-4 py-2 hover:bg-[#D84040]"
              >
                Edit Profile
              </Link>
            </div>
          </div>

          {/* Login/Logout */}
          <Link
            to={authUser ? "/logout" : "/login"}
            className="flex items-center gap-2 bg-[#8E1616] px-4 py-2 rounded-lg text-white hover:bg-[#D84040] transition"
            // onClick={authUser? logout():null }
          >
            <button type="submit" onClick={handleSubmit}>
            {authUser ? "Logout" : "Login"}
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col bg-[#2C2222] mt-2 p-4 space-y-4 rounded-lg">
          <Link
            to="/settings"
            className="flex items-center gap-2 hover:text-[#D84040] transition"
          >
            <FiSettings size={20} />
            <span>Settings</span>
          </Link>

          <Link
            to="/profile"
            className="flex items-center gap-2 hover:text-[#D84040] transition"
          >
            <FiUser size={20} />
            <span>Profile</span>
          </Link>

          <button
            className="flex items-center gap-2 bg-[#8E1616] px-4 py-2 rounded-lg text-white hover:bg-[#D84040] transition"
            onClick={() => setIsLoggedIn(!isLoggedIn)}
          >
            {isLoggedIn ? <FiLogOut size={20} /> : <FiLogIn size={20} />}
            <span>{isLoggedIn ? "Logout" : "Login"}</span>
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
