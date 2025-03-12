import { useEffect ,useRef ,useLayoutEffect} from "react";
import { useChatStore } from "../store/useChatStore";
import MessageSkeleton from "./skeletons/MessageSkeleton ";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useAuthStore } from "../store/useAuthStore";
import pic from "../assets/pic.jpeg";

function ChatContainer() {
  const { messages, getMessages, isMessagesLoading, selectedUser } = useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser._id, getMessages]);

  const scrollRef=useRef(null);
  useLayoutEffect(()=>{
    if(scrollRef.current){
      scrollRef.current.scrollTop=scrollRef.current.scrollHeight;
    }
  },[messages]);


  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }
  

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-gradient-to-b from-[#092629] to-[#004D3F] text-white">
      <ChatHeader />

      <div ref={scrollRef}  className="flex-1  overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex items-start gap-3 ${
              message.senderId === authUser._id
                ? "justify-end "
                : "justify-start "
            }`}
          >
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full border-2 border-[#E6B373] overflow-hidden shadow-lg">
              <img
                src={
                  message.senderId === authUser._id
                    ? authUser.profilePic || pic
                    : selectedUser.profilePic || pic
                }
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Message Content */}
            <div className="max-w-xs sm:max-w-sm flex flex-col">
              <div className="chat-header text-xs text-[#E6B373] opacity-80 mb-1">
                <time>{message.createdAt}</time>
              </div>

              <div
                className={`p-3 rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105 ${
                  message.senderId === authUser._id
                    ? "bg-[#E6B373] text-[#092629]"
                    : "bg-[#FCF1EA] text-[#004D3F]"
                }`}
              >
                {/* Image Message */}
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="max-w-[200px] rounded-md mb-2 shadow-md"
                  />
                )}

                {/* Text Message */}
                {message.text && <p className="break-words text-sm">{message.text}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
}

export default ChatContainer;