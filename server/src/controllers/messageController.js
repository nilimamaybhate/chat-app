import Message from "../models/Message.js";
import { getIO, getOnlineUsers } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { receiverId, text } = req.body;

    const message = await Message.create({
      sender: req.user.userId,
      receiver: receiverId,
      text,
    });

    const io = getIO();
    const onlineUsers = getOnlineUsers();

    const receiverSocketId =
      onlineUsers[receiverId];

    const senderSocketId =
      onlineUsers[req.user.userId];

    // Send to receiver
    if (receiverSocketId) {
      io.to(receiverSocketId).emit(
        "newMessage",
        message
      );
    }

    // Send to sender
    if (senderSocketId) {
      io.to(senderSocketId).emit(
        "newMessage",
        message
      );
    }

    res.status(201).json(message);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMessages = async (req, res) => {
  try {

    const messages = await Message.find();

    console.log(messages);

    res.status(200).json(messages);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};