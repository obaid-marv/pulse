"use client";
import { Images } from "@/constants/images";
import Label from "../Label";
import styles from "./UsersDropdown.module.scss";
import { User } from "@/types/auth/interfaces";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSocket } from "@/context/socketContext";

interface UsersDropdownProps {
  users: User[];
}

export default function UsersDropdown({ users }: UsersDropdownProps) {
  const [onlineUsers, setOnlineUsers] = useState<number[]>([]);
  const [messageCounts, setMessageCounts] = useState<Record<number, number>>({});

  const pathname = usePathname();
  const params = useParams();
  const socket = useSocket();

  const checkActive = (id: number) => {
    if (pathname.includes("/home/user")) {
      return id.toString() === params.id;
    }
    return false;
  };

  useEffect(() => {
    if (!socket) return;

    // Request the online users list from the server
    socket.emit("getOnlineUsers");

    // Listen for new messages
    socket.on("receiveMessage", (newMessage) => {
      if (newMessage.receiverId) {
        const senderId: number = newMessage.senderId;
        setMessageCounts((prevCounts) => ({
          ...prevCounts,
          [senderId]: (prevCounts[senderId] || 0) + 1,
        }));
      }
    });

    socket.on("onlineUsers", (users: number[]) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("onlineUsers");
      socket.off("receiveMessage");
    };
  }, [socket]);

  return (
    <div className={styles.container}>
      {users.length > 0 &&
        users.map((user) => (
          <Label
            key={user.id}
            id={user.id}
            type="user"
            name={user.name}
            icon={user.imgUrl || Images["default-avatar"]}
            isActive={checkActive(user.id)}
            online={onlineUsers.includes(user.id)}
            messageCount={messageCounts[user.id] || 0}
          />
        ))}
    </div>
  );
}
