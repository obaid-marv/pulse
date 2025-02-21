"use client";
import { useEffect, useState } from "react";
import { MessageData } from "@/types/socketEvents";
import ChatInput from "@/app/components/ChatInput";
import Message from "../Message";
import styles from "./GroupChatSection.module.scss";
import { Images } from "@/constants/images";
import useMyDetails from "@/hooks/Auth/useGetMyDetails";
import { useSocket } from "@/context/socketContext";
import { Group } from "@/types/group/Interfaces";
import useAllUsers from "@/hooks/user/usegetAllUsers";
import usePreviousGroupMessages from "@/hooks/group/usePreviousGroupMessages";

interface GroupChatSectionProps {
  groupData?: Group;
  creator: string;
}

export default function GroupChatSection({ groupData, creator }: GroupChatSectionProps) {
  const { data: currentUserData } = useMyDetails();
  const { data: allUsers } = useAllUsers();
  const {
    data: previousMessagesData,
    isPending,
    refetch,
  } = usePreviousGroupMessages(groupData?.id || 0);
  const socket = useSocket();

  const senderId = currentUserData?.user.id || 0;
  const groupId = groupData?.id || 0;

  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<MessageData[]>([]);

  useEffect(() => {
    if (!socket || !senderId || !groupId) return;

    socket.emit("register", senderId);
    socket.emit("joinGroup", groupId);

    return () => {
      socket.emit("leaveGroup", groupId);
    };
  }, [socket, senderId, groupId]);

  useEffect(() => {
    if (!socket) return;
    const receiveMessageHandler = (newMessage: MessageData) => {
      if (newMessage.senderId !== senderId) setMessages((prev) => [...prev, newMessage]);
    };
    socket.on("receiveMessage", receiveMessageHandler);

    return () => {
      socket.off("receiveMessage", receiveMessageHandler);
    };
  }, [socket]);

  useEffect(() => {
    if (previousMessagesData?.success) {
      setMessages(previousMessagesData.messages);
    }
  }, [previousMessagesData]);

  const handleMessageChange = (newMessage: string) => {
    setMessage(newMessage);
  };

  const handleSendMessage = () => {
    if (!socket || !message.trim() || !senderId || !groupId) return;

    const newMessage: MessageData = {
      id: Date.now(),
      senderId,
      groupId,
      content: message,
      messageType: "text",
    };

    socket.emit("sendMessage", newMessage);
    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
  };

  const handleFileUpload = ({ dataUrl, fileName }: { dataUrl: string; fileName: string }) => {
    if (!socket || !senderId || !groupId) return;

    const fileMessage: MessageData = {
      id: Date.now(),
      senderId,
      groupId: groupId,
      content: dataUrl, // temporary, the server will save the file and update content to file URL
      messageType: "image",
    };

    console.log(fileMessage);
    socket.emit("sendFile", fileMessage);
    setMessages((prev) => [...prev, fileMessage]);
  };

  const findMessageUser = (messageSenderId: number) => {
    const user = allUsers?.users.find((user) => user.id == messageSenderId);
    return user;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  };

  if (!socket) return <div>Loading...</div>;

  return (
    <div className={styles.chatSection}>
      <div className={styles.headingContainer}>
        <h1 className={styles.heading}>
          <span className={styles.hashtag}>#</span> {groupData?.name}
        </h1>
        <p className={styles.description}>
          <span className={styles.mention}>@{creator}</span> created this group on{" "}
          {formatDate(groupData?.createdAt || "")}. This is the very beginning of the{" "}
          {groupData?.name}
        </p>
      </div>
      {isPending && <h2>Loading ...</h2>}

      {messages.map((msg) => (
        <Message
          key={msg.id}
          type={msg.messageType}
          sender={
            msg.senderId === senderId ? "You" : findMessageUser(msg.senderId)?.name || "Other"
          }
          text={msg.content}
          avatar={
            msg.senderId === senderId
              ? currentUserData?.user.imgUrl || Images["default-avatar"]
              : Images["default-avatar"]
          }
        />
      ))}

      <ChatInput
        onChange={handleMessageChange}
        handleSubmit={handleSendMessage}
        handleFileUpload={handleFileUpload}
      />
    </div>
  );
}
