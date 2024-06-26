const http = require('http');
const socketIo = require('socket.io');
const app = require('./app');

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('like', (postId) => {
    io.emit('update', postId);
  });
  
  socket.on('comment', (postId) => {
    io.emit('update', postId);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
