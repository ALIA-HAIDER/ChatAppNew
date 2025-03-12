import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiSettings, FiLogIn, FiLogOut, FiUser } from "react-icons/fi";
import { MdMenu, MdClose } from "react-icons/md";
import { useAuthStore } from "../store/useAuthStore.js";
import { IoHome } from "react-icons/io5";


function Navbar() {
  const { authUser, checkAuth, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (authUser) {
      await logout();
      console.log("Logged out successfully");
    }
  };

  return (
    <nav className="z-5 bg-[#0D1B2A] text-[#F8F8F8] shadow-lg px-6 py-4 relative">
      <div className="container mx-auto flex justify-between items-center">
        
        <Link to="/" className="text-3xl font-bold font-mono bg-gradient-to-r from-[#FCA311] to-[#FF5F6D] text-transparent bg-clip-text">
        
          OBLIVION
        </Link>

        
        <div className="hidden md:flex items-center space-x-6">
          
          <Link to="/" className="flex items-center gap-2 hover:text-[#FCA311] transition-transform transform hover:scale-105">
            <IoHome size={22} />
            <span>Home</span>
          </Link>

          
          <div className="relative group">
            <button className="flex items-center gap-2 hover:text-[#FCA311] transition-transform transform hover:scale-105">
              <FiUser size={22} />
              <span>Profile</span>
            </button>
            <div className="absolute right-0 mt-2 w-40 bg-[#1B263B] backdrop-blur-md shadow-2xl rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Link to="/profile" className="block px-4 py-2 hover:bg-[#FCA311] rounded-t-lg text-black transition">
                View Profile
              </Link>
            </div>
          </div>

          
          <button className="flex items-center gap-2 bg-[#1B263B] px-5 py-2 rounded-lg text-white hover:bg-[#FCA311] transition-transform transform hover:scale-105"
            onClick={handleSubmit}>
            {authUser ? <FiLogOut size={22} /> : <FiLogIn size={22} />}
            <span>{authUser ? "Logout" : "Login"}</span>
          </button>
        </div>

        
        <button className="md:hidden text-[#FCA311]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <MdClose size={30} /> : <MdMenu size={30} />}
        </button>
      </div>

     
      {isOpen && (
        <div className="md:hidden flex flex-col bg-[#1B263B] mt-2 p-4 space-y-4 rounded-lg shadow-lg">
          <Link to="/settings" className="flex items-center gap-2 hover:text-[#FCA311] transition-transform transform hover:scale-105">
            <FiSettings size={22} />
            <span>Settings</span>
          </Link>

          <Link to="/profile" className="flex items-center gap-2 hover:text-[#FCA311] transition-transform transform hover:scale-105">
            <FiUser size={22} />
            <span>Profile</span>
          </Link>

          <button className="flex items-center gap-2 bg-[#1B263B] px-5 py-2 rounded-lg text-white hover:bg-[#FCA311] transition-transform transform hover:scale-105"
            onClick={handleSubmit}>
            {authUser ? <FiLogOut size={22} /> : <FiLogIn size={22} />}
            <span>{authUser ? "Logout" : "Login"}</span>
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;