import React from 'react';
import { GiChatBubble } from "react-icons/gi";

function NoChatSelected() {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16  bg-[#1D1616] text-[#EEEEEE]">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-6">
          <div className="relative">
            <div
              className="w-20 h-20 rounded-full bg-[#D84040] flex items-center justify-center shadow-lg animate-pulse"
            >
              <GiChatBubble className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-3xl font-bold font-serif text-[#D84040]">Oblivon!<br></br>For chats that are beyond reality.</h2>
        <p className="text-[#EEEEEE] text-lg">
          Select a conversation from the sidebar to start chatting.
        </p>
      </div>
    </div>
  );
}

export default NoChatSelected;
