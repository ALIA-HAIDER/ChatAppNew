import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import MessageSkeleton from "./skeletons/MessageSkeleton ";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useAuthStore } from "../store/useAuthStore";
import pic from "../assets/pic.jpeg";

function ChatContainer() {
  const { messages, getMessages, isMessagesLoading, selectedUser } =
    useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser._id, getMessages]);

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
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="bg-amber-50 flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex items-start gap-3 ${
              !message.senderId === authUser._id
                ? "justify-end "
                : "justify-start flex-row-reverse"
            }`}
          >
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full border overflow-hidden">
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
              <div className={`chat-header text-sm opacity-70 mb-1`}>
                <time className="text-xs">{message.createdAt}</time>
              </div>

              <div
                className={`p-2 rounded-lg ${
                  message.senderId === authUser._id
                    ? "bg-green-300 text-black"
                    : "bg-gray-200 text-gray-900"
                }`}
              >
                {/* Image Message */}
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="max-w-[200px] rounded-md mb-2"
                  />
                )}

                {/* Text Message */}
                {message.text && <p className="break-words">{message.text}</p>}
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
