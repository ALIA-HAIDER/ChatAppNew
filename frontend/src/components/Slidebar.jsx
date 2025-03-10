import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import SlidebarSkeleton from "./skeletons/SlidebarSkeleton";
import { FaUsers } from "react-icons/fa6";
import { useAuthStore } from "../store/useAuthStore";
import pic from "../assets/pic.jpeg";


function Slidebar() {
  const { getUser, setSelectedUser, users, selectedUser, isUsersLoading } = useChatStore();
  const {onlineUsers} = useAuthStore();
  

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (isUsersLoading) {
    return <SlidebarSkeleton />;
  }

  return (
    <aside className="w-78 bg-[#1D1616] text-[#EEEEEE] overflow-y-auto flex flex-col transition-all duration-300 shadow-lg border-r-2 border-[#D84040]">
      <div className="border-b border-[#D84040] w-full p-5 bg-gradient-to-r from-[#8E1616] to-[#D84040] text-white shadow-md">
        <div className="flex items-center gap-3">
          <FaUsers className="size-7 text-white animate-pulse" />
          <span className="font-semibold text-lg">Contacts</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-4 rounded-lg transition-all duration-300 
              hover:bg-[#D84040] hover:scale-[1.02] 
              ${selectedUser?._id === user._id ? "bg-[#8E1616] ring-2 ring-[#D84040] scale-[1.03]" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || pic}
                alt={user.name}
                className="size-12 object-cover rounded-full border-2 border-[#D84040] shadow-lg"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-[#1D1616] animate-ping"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate text-white text-lg">{user.fullName}</div>
              <div className="text-sm text-gray-300">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}

export default Slidebar;
