import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import SlidebarSkeleton from "./skeletons/SlidebarSkeleton";
import { FaUsers } from "react-icons/fa6";
import { useAuthStore } from "../store/useAuthStore";
import pic from "../assets/pic.jpeg";

function Slidebar() {
  const { getUser, setSelectedUser, users, selectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (isUsersLoading) {
    return <SlidebarSkeleton />;
  }

  return (
    <aside className="w-78 bg-[#121212] text-[#E0E0E0] overflow-y-auto flex flex-col transition-all duration-300 shadow-xl border-r border-[#FFC107]">
      
      {/* Header Section */}
      <div className="border-b border-[#FFC107] w-full p-5 bg-[#FFC107] text-[#121212] font-semibold text-lg shadow-md tracking-wide flex items-center gap-3">
        <FaUsers className="size-7 text-[#121212]" />
        <span>Contacts</span>
      </div>

      {/* Users List */}
      <div className="overflow-y-auto w-full py-3">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-4 rounded-lg transition-all duration-300 relative
              hover:bg-[#333333] hover:scale-[1.02] hover:shadow-lg
              ${selectedUser?._id === user._id ? "bg-[#FFC107] text-[#121212] font-bold scale-[1.05] shadow-lg ring-2 ring-[#FFD54F]" : ""}
            `}
          >
            {/* Profile Image with Status Indicator */}
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || pic}
                alt={user.name}
                className="size-12 object-cover rounded-full border-2 border-[#FFC107] shadow-md transition-transform duration-200 hover:scale-105"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-[#00C853] rounded-full ring-2 ring-[#121212] animate-pulse" />
              )}
            </div>

            {/* User Info (Visible on Larger Screens) */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate text-white text-lg tracking-wide">{user.fullName}</div>
              <div className="text-sm text-gray-400">
                {onlineUsers.includes(user._id) ? 
                  <span className="text-[#00C853] font-medium animate-pulse">Online</span> : 
                  <span className="text-red-400 font-medium">Offline</span>
                }
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}

export default Slidebar;
