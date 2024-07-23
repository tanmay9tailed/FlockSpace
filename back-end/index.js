require('dotenv').config()
const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");

const server = http.createServer(app);

const {Socket} = require("./socket");
const io = (new Socket(server)).io;

io.on("connection", (socket) => {
  console.log("New client connected");

  // socket.on('like', (postId) => {
  //   io.emit('update', postId);
  // });

  // socket.on('comment', (postId) => {
  //   io.emit('update', postId);
  // });

  // socket.on('disconnect', () => {
  //   console.log('Client disconnected');
  // });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
