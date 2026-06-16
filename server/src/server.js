import dotenv from "dotenv";
dotenv.config();

import { createServer } from "http";
import { Server } from "socket.io";

import app from "./app.js";
import { connectDB } from "./config/db.js";
import { initSocket } from "./socket/socket.js";

connectDB();

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

initSocket(io);

server.listen(process.env.PORT, () => {
  console.log(`Server running at port: ${process.env.PORT}`);
});