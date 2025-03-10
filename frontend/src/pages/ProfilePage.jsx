import { useAuthStore } from "../store/useAuthStore.js";
import { FaCameraRetro } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { AiTwotoneMail } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";
import { RiShieldUserFill } from "react-icons/ri";
import { useState } from "react";

function ProfilePage() {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleSubmit = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Image = reader.result;
        setSelectedImg(base64Image);
        await updateProfile({ profilePic: base64Image });
      };
    } catch (error) {
      console.log("Error in Profile Update:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[95vh] bg-gradient-to-br from-black via-gray-900 to-[#FCA311] w-full p-0">
      <div className="bg-[#1E1E1E] flex flex-col items-center mt-0 h-auto p-10 rounded-lg  w-full max-w-lg text-[#EEEEEE] focus:outline-none focus:ring-8 focus:ring-[#FCA311] transition-shadow shadow-lg shadow-[#FCA311]">
        {/* Profile Image & Upload Button */}
        <div className="relative">
          <img
            src={
              selectedImg ||
              authUser?.profilepic ||
              "https://i.pinimg.com/736x/0b/8d/26/0b8d26b71747573122f9cee71d6defad.jpg"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-[#FCA311]] shadow-md"
          />

          {/* Camera Upload Button */}
          <label
            htmlFor="avatar-upload"
            className={`absolute bottom-2 right-2 bg-[#FCA311] hover:scale-105 
            p-2 cursor-pointer transition-all duration-200 rounded-full text-[#FCA311] 
            hover:bg-[#9A67EA] shadow-lg flex items-center justify-center ${
              isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
            }`}
          >
            <FaCameraRetro className="w-5 h-5 text-white" />
            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              onChange={handleSubmit}
              disabled={isUpdatingProfile}
              className="hidden"
            />
          </label>
        </div>

        {/* Upload Status Text */}
        <p className="text-sm text-gray-400 mt-3">
          {isUpdatingProfile ? "Uploading..." : "Tap the camera to update your vibe"}
        </p>

        {/* User Info Section */}
        <div className="mt-6 text-center">
          <h2 className="text-3xl font-semibold text-[#EEEEEE] flex items-center justify-center gap-2 ">
            <CiUser className="text-[#FCA311]" /> {authUser?.fullName || "Anon User"}
          </h2>
          <p className="text-[#BBBBBB] mt-2 flex items-center justify-center gap-2">
            <AiTwotoneMail className="text-[#FCA311]" /> {authUser?.email || "no-reply@example.com"}
          </p>
        </div>

        {/* Account Info Section */}
        <div className="mt-8 w-full">
          <h3 className="text-xl font-semibold text-[#EEEEEE] text-center mb-4">Account Status</h3>
          <div className="bg-[#252525] p-5 rounded-lg shadow-md text-sm text-[#EEEEEE] border focus:outline-none focus:ring-2 focus:ring-[#FCA311] transition-shadow  hover:shadow-[#FCA311]">
            <div className="flex justify-between items-center mb-3">
              <span className="flex items-center gap-2">
                <MdDateRange className="text-[#FCA311]" /> Member Since
              </span>
              <span className="text-gray-300">{authUser?.memberSince || "Unknown"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <RiShieldUserFill className="text-[#FCA311]" /> Account Status
              </span>
              <span className={`font-semibold ${authUser ? "text-green-400" : "text-red-400"}`}>
                {authUser?.status || "Active"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
