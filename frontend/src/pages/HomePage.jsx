import ChatContainer from "../components/ChatContainer.jsx";
import Slidebar from "../components/Slidebar.jsx";
import { useChatStore } from "../store/useChatStore.js";
// import { useEffect } from "react";
import NoChatselected from "../components/NoChatselected.jsx";

function HomePage() {
  const { selectedUser } = useChatStore();

  return (
    <div className=" z-0 justify-center align-middle w-full h-fit bg-gradient-to-br from-[#1D1616] to-[#2A1B3D] text-[#EEEEEE] ">
      <div className=" align-middle  pt-0 ">
        <div className="roundeed-lg ">
          <div className="flex h-[90vh] w-[100%] rounded-lg overfow-hidden">
            <Slidebar/>

            {!selectedUser ?  <NoChatselected/> : <ChatContainer/>}
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
