const { Server } = require("socket.io");

// const io = new Server(server, {
//     cors: {
//       origin: "*",
//     },
// });

// let io = null;

// function createSocket(server) {}

// function socketFactory() {
//   let io;
//   return {
//     createSocket() {
//       io = new Server(server, {
//         cors: {
//           origin: "*",
//         },
//       });
//       return io;
//     },
//     getSocket() {
//       return io;
//     },
//   };
// }



let instance;

class Socket {
    constructor(server) {
      if (instance) {
        throw new Error("You can only create one instance!");
      }
      this.io = new Server(server, {
        cors: {
          origin: "*",
        },
      });
      instance = this;
    }

    getSocket() {
        return this.io;
    }
}

const getSocketInstance = () => instance;
  
module.exports = {Socket, getSocketInstance};