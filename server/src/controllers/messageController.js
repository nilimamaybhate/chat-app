import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
    try {
        const {receiverId, text} = req.body;

        console.log("BODY:", req.body);
console.log("USER:", req.user);



        const messages = await Message.create({
            sender: req.user.userId,
            receiver: receiverId,
            text,
        });

        console.log(messages);

        res.status(200).json(messages);
    }catch(error){
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