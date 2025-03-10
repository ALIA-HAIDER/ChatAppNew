import React from "react";
import { GiChatBubble } from "react-icons/gi";

function NoChatSelected() {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-gradient-to-br from-[#141E30] via-[#243B55] to-[#0D1B2A] text-[#E0FBFC] relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-96 h-96 bg-[#3ECF8E] blur-[150px] rounded-full absolute top-20 left-10"></div>
        <div className="w-96 h-96 bg-[#FCA311] blur-[180px] rounded-full absolute bottom-10 right-10"></div>
      </div>

      <div className="max-w-md text-center space-y-8 relative z-10">
        {/* Icon Display with Glowing Effect */}
        <div className="flex justify-center gap-4 mb-6">
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-[#3ECF8E] flex items-center justify-center shadow-2xl animate-pulse 
              backdrop-blur-lg bg-opacity-90 transition duration-300 hover:scale-110 hover:shadow-[0_0_25px_#3ECF8E]">
              <GiChatBubble className="w-14 h-14 text-[#141E30] drop-shadow-lg" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-5xl font-extrabold font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#3ECF8E] to-[#FCA311] drop-shadow-md">
          Welcome to Oblivion! 🌌
        </h2>
        <p className="text-lg text-[#E0FBFC] opacity-90 tracking-wide">
          Select a conversation from the sidebar to start chatting and explore a world beyond reality.
        </p>
      </div>
    </div>
  );
}

export default NoChatSelected;
