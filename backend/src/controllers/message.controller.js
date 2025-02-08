import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUserForSideBar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filteredUsers);

    } catch (error) {
        console.error("Error in get Usersfor Sidebar:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }

}


export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, recieverId: userToChatId },
                { senderId: userToChatId, recieverId: myId }
            ]
        })
        res.status(200).json(messages);

    } catch (error) {
        console.error("Error in get Message:", error.message);
        res.status(500).json({ message: "Internal server error" });

    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: recieverId } = req.params;
        const senderId = req.user._id;

        let imgUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imgUrl=uploadResponse.url;
        }

        const newMessage= new Message({
            senderId,
            recieverId,
            text,
            image:imgUrl,
        });

        await newMessage.save();

        //todo:real time functionality goes here=>socket.io

        res.status(201).json(newMessage);

    } catch (error) {
        console.error("Error in send Message:", error.message);
        res.status(500).json({ message: "Internal server error" });

    }
}