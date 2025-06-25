const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();


const bookingController = require("./controllers/services/guiders/bookingController");
const routingPath = require("./routes/routes");

if (!process.env.MONGO_URI || !process.env.PORT) {
  console.error("Environment variables MONGO_URI or PORT are not set.");
  process.exit(1);
}

const app = express();


app.use(
  cors({
    origin: "http://localhost:3000", // React frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});


app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use("/api", routingPath);


const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.set("io", io);



io.of("/chat").on("connection", (socket) => {
  console.log("New client connected for chat:", socket.id);


  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
    console.log(`Socket ${socket.id} joined chat room: ${chatId}`);
  });

  socket.on('sendMessage', (message) => {
    console.log('Message received from client:', message); 
    io.of('/chat').to(message.chatId).emit('newMessage', message); 
});

socket.on('typing', (data) => {
  const { chatId, isTyping } = data;
  console.log('Message is typing from client:',isTyping); 
  io.of('/chat').to(chatId).emit('typing', { chatId, isTyping });
});

socket.on('userOnline', ({ userId }) => {
  socket.broadcast.emit('updateStatus', { userId, isOnline: true });
});


socket.on('disconnect', () => {
  console.log('User disconnected:', socket.id);
});
});


mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection established");
    server.listen(process.env.PORT, () => {
      console.log(`Backend listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });


bookingController.initializeSocket(io);
