import { io } from "socket.io-client";



export function useSocket() {
    const socket = io("https://flock-space-server.vercel.app");
    return socket;
}

