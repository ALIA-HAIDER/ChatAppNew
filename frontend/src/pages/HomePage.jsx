import ChatContainer from "../components/ChatContainer.jsx";
import Slidebar from "../components/Slidebar.jsx";
import { useChatStore } from "../store/useChatStore.js";
// import { useEffect } from "react";
import NoChatselected from "../components/NoChatselected.jsx";

function HomePage() {
  const { selectedUser } = useChatStore();

  return (
    <div className="justify-center align-middle w-[100vw] h-[100vh] bg-[#1D1616]">
      <div className=" align-middle p-4 pt-0 ">
        <div className="roundeed-lg h-[calc(100vh-6rem)]">
          <div className="flex h-full w-[100%] rounded-lg overfow-hidden">
            <Slidebar/>

            {!selectedUser ?  <NoChatselected/> : <ChatContainer/>}
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
