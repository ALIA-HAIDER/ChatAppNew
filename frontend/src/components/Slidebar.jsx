import React, { useEffect ,useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SlidebarSkeleton from "./skeletons/SlidebarSkeleton";
import { FaUsers } from "react-icons/fa6";
import { useAuthStore } from "../store/useAuthStore";
import pic from "../assets/pic.jpeg";

function Slidebar() {
  const { getUser, setSelectedUser, users, selectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [ showOnlineOnly, setShowOnlineOnly ] = useState(false);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const filteresUSer = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) {
    return <SlidebarSkeleton />;
  }

  return (
    <aside className="w-40 md:w-2/5 lg:w-1/4 xl:w-[20%] md:min-w-[250px] max-w-[400px] bg-[#121212] text-[#E0E0E0] overflow-y-auto flex flex-col transition-all duration-300 shadow-xl border-r border-[#FFC107]">
      {/* Header Section */}
      <div className="border-b border-[#FFC107] w-full p-5 bg-[#FFC107] text-[#121212] font-semibold text-lg shadow-md tracking-wide flex items-center gap-3">
        <FaUsers className="size-7 text-[#121212]" />
        <span>Contacts</span>
      </div>
      <div className="mt-3 lg:flex items-center gap-2">
        <label className="flex items-center gap-2 cursor-pointer text-white">
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            className="w-4 h-4 accent-[#FFC107] rounded border border-gray-300 focus:ring-2 focus:ring-[#FFD54F] transition-all"
          />
          <span className="text-sm text-gray-200">Show online only</span>
        </label>
        <span className="text-xs text-gray-400">
          ({Math.max(onlineUsers.length - 1, 0)} online)
        </span>
      </div>

      {/* Users List */}
      <div className="overflow-y-auto w-full py-3">
        {filteresUSer.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
        w-full p-3 flex items-center sm:items-center gap-3 sm:gap-4 md:gap-5 rounded-lg transition-all duration-300 relative
        hover:bg-[#333333] hover:scale-[1.02] hover:shadow-lg
        ${
          selectedUser?._id === user._id
            ? "bg-[#FFC107] text-[#121212] font-bold scale-[1.05] shadow-lg ring-2 ring-[#FFD54F]"
            : ""
        }
      `}
          >
            
            <div className="relative flex-shrink-0">
              <img
                src={user.profilePic || pic}
                alt={user.name}
                className="size-12 sm:size-14 object-cover rounded-full border-2 border-[#FFC107] shadow-md transition-transform duration-200 hover:scale-105"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 sm:size-4 bg-[#00C853] rounded-full ring-2 ring-[#121212] animate-pulse" />
              )}
            </div>

           
            <div className="flex-grow min-w-0 text-left">
              <div className="font-medium truncate text-white text-sm sm:text-lg tracking-wide">
                {user.fullName}
              </div>
              <div className="text-xs sm:text-sm text-gray-400">
                {onlineUsers.includes(user._id) ? (
                  <span className="text-[#00C853] font-medium animate-pulse">
                    Online
                  </span>
                ) : (
                  <span className="text-red-400 font-medium">Offline</span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}

export default Slidebar;
