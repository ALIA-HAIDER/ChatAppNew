import { useChatStore } from "../store/useChatStore.js";
import { AiTwotoneCloseCircle } from "react-icons/ai";
import { useAuthStore } from "../store/useAuthStore.js";
import pic from "../assets/pic.jpeg";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="flex justify-between items-center py-3 px-5 bg-[#092629] bg-opacity-90 backdrop-blur-md text-white border-b border-[#004D3F] shadow-lg">
      {/* User Info */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#E6B373] shadow-md">
            <img
              src={selectedUser.profilePic || pic}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Online Indicator */}
          <span
            className={`absolute bottom-1 right-1 w-3 h-3 rounded-full border-2 border-[#FCF1EA] ${
              isOnline ? "bg-green-500" : "bg-gray-400"
            }`}
          ></span>
        </div>

        <div>
          <h3 className="font-semibold text-lg">{selectedUser.fullName}</h3>
          <p className={`text-sm ${isOnline ? "text-green-400" : "text-gray-400"}`}>
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={() => setSelectedUser(null)}
        className="transition-transform transform hover:scale-110"
      >
        <AiTwotoneCloseCircle className="size-7 text-[#E6B373] hover:text-red-500 transition-all" />
      </button>
    </div>
  );
}

export default ChatHeader;
