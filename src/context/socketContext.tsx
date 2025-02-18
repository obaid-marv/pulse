"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import useMyDetails from "@/hooks/Auth/useGetMyDetails"; 

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { data: currentUserData } = useMyDetails();

  useEffect(() => {
    const socketInstance = io("http://localhost:4000");
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("Socket connected:", socketInstance.id);

      const userId = currentUserData?.user.id; 
      if (userId) {
        console.log(`Registering user with ID: ${userId}`);
        socketInstance.emit("register", userId)
      }
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [currentUserData]); 

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) {
    console.warn("useSocket called outside of SocketProvider. Returning null.");
    return null;
  }
  return socket;
};
