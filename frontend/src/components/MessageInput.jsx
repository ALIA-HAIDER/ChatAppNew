import { useChatStore } from "../store/useChatStore";
import { useState, useRef } from "react";
import { IoIosImages } from "react-icons/io";
import { GrSend } from "react-icons/gr";
import toast from "react-hot-toast";
import { AiTwotoneCloseCircle } from "react-icons/ai";

function MessageInput() {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file!");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({ text: text.trim(), image: imagePreview });
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 w-full bg-[#092629] bg-opacity-90 backdrop-blur-md text-white border-t border-[#004D3F] shadow-lg">
      {/* Image Preview Section */}
      {imagePreview && (
        <div className="mb-3 flex items-center gap-3">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-lg border-2 border-[#E6B373] shadow-md"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#FCF1EA] flex items-center justify-center shadow-lg hover:bg-red-500 transition-all"
              type="button"
            >
              <AiTwotoneCloseCircle className="size-4 text-red-700 hover:text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Input Section */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            className="w-full px-4 py-2 bg-[#0C3D40] text-white rounded-full border-2 border-[#E6B373] focus:outline-none focus:ring-2 focus:ring-[#E6B373] transition-all placeholder-gray-400"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {/* Image Upload Button */}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />

        <button
          type="button"
          className="p-2 rounded-full bg-[#0C3D40] border-2 border-[#E6B373] hover:bg-[#E6B373] hover:text-[#092629] transition-all"
          onClick={() => fileInputRef.current.click()}
        >
          <IoIosImages size={24} />
        </button>

        {/* Send Button */}
        <button
          type="submit"
          className="p-2 rounded-full bg-[#E6B373] text-[#092629] hover:bg-[#0C3D40] hover:text-white border-2 border-[#E6B373] transition-all disabled:opacity-50"
          disabled={!text.trim() && !imagePreview}
        >
          <GrSend size={24} />
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
