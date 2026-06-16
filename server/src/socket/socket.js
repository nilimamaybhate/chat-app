let io;

const onlineUsers = {};

export const initSocket = (socketServer) => {
  io = socketServer;

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("registerUser", (userId) => {
      onlineUsers[userId] = socket.id;

      console.log("Online Users:", onlineUsers);
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected:", socket.id);

      for (const userId in onlineUsers) {
        if (onlineUsers[userId] === socket.id) {
          delete onlineUsers[userId];
        }
      }
    });
  });
};

export const getIO = () => io;

export const getOnlineUsers = () => onlineUsers;