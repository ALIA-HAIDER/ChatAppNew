import { useChatStore } from "../store/useChatStore.js";
import { AiTwotoneCloseCircle } from "react-icons/ai";
import { useAuthStore } from "../store/useAuthStore.js";
import pic from "../assets/pic.jpeg";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className=" flex  justify-between py-3 px-5 bg-black/30 backdrop-blur-md text-white   items-center jborder-b  shadow-md ">
      <div className="flex items-center gap-3">
        <div className="relative mx-auto lg:mx-0">
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePic || pic} className="rounded-full" />
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-medium">{selectedUser.fullName}</h3>
          <p className="text-sm text-base-content/70">
            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
          </p>
        </div>
      </div>
      <button onClick={() => setSelectedUser(null)}>
        <AiTwotoneCloseCircle className="size-7 text-red-700 " />
      </button>
    </div>
  );
}

export default ChatHeader;
