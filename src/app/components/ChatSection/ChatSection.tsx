import { MessageData } from "@/types/socketEvents";
import ChatInput from "@/app/components/ChatInput";
import Message from "../Message";
import styles from "./ChatSection.module.scss";
import { Images } from "@/constants/images";
import { User } from "@/types/auth/interfaces";
import useMyDetails from "@/hooks/Auth/useGetMyDetails";
import { useState, useEffect } from "react";
import { useSocket } from "@/context/socketContext";
import usePreviousMessages from "@/hooks/messages/usePreviousMessages";
import { useParams } from "next/navigation";
import Image from "next/image";

interface ChatSectionProps {
  userData?: User;
}

export default function ChatSection({ userData }: ChatSectionProps) {
  const { data: currentUserData } = useMyDetails();
  const senderId = currentUserData?.user.id;
  const params = useParams();
  const recieverId = Array.isArray(params.id)
    ? parseInt(params.id[0])
    : params.id
      ? parseInt(params.id)
      : null;

  const {
    data: prevMessagesData,
    isPending,
  } = usePreviousMessages(senderId || 0, recieverId || 0);
  const socket = useSocket();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<MessageData[]>([]);

  const handleMessageChange = (newMessage: string) => {
    setMessage(newMessage);
  };

  const handleSendMessage = () => {
    if (!socket || !message.trim() || !senderId || !recieverId) return;

    const newMessage: MessageData = {
      id: Date.now(),
      senderId,
      receiverId: recieverId,
      content: message,
      messageType: "text",
    };

    socket.emit("sendMessage", newMessage);
    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
  };

  // Handler for file uploads
  const handleFileUpload = ({ dataUrl, fileName }: { dataUrl: string; fileName: string }) => {
    if (!socket || !senderId || !recieverId) return;

    const fileMessage: MessageData = {
      id: Date.now(),
      senderId,
      receiverId: recieverId,
      content: dataUrl,
      messageType: "image",
    };

    console.log(fileMessage);
    socket.emit("sendFile", fileMessage);
    setMessages((prev) => [...prev, fileMessage]);
  };

  useEffect(() => {
    if (!socket) return;

    const receiveMessageHandler = (newMessage: MessageData) => {
      console.log(newMessage);
      if (newMessage.senderId == recieverId) {
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    socket.on("receiveMessage", receiveMessageHandler);

    return () => {
      socket.off("receiveMessage", receiveMessageHandler);
    };
  }, [socket]);

  useEffect(() => {
    if (prevMessagesData && prevMessagesData.messages) {
      setMessages(prevMessagesData.messages);
    }
  }, [prevMessagesData]);

  if (!socket) return <div>Loading...</div>;

  return (
    <div className={styles.chatSection}>
      <div className={styles.profileSection}>
        <div className={styles.profileInfo}>
          <div className={styles.imageWrapper}>
            <Image
              src={userData?.imgUrl || Images["default-avatar"]}
              alt="Profile"
              width={140}
              height={140}
              className={styles.profileImage}
            />
          </div>
          <div className={styles.profileText}>
            <h1 className={styles.name}>{userData?.name}</h1>
            <p className={styles.description}>
              This conversation is between @{userData?.name} and you. Checkout their profile to know
              more about them.
            </p>
          </div>
          <div className={styles.viewProfileButton}>View Profile</div>
        </div>
      </div>
      {isPending && <h2>Loading...</h2>}
      {messages.map((msg) => (
        <Message
          key={msg.id}
          sender={msg.senderId === senderId ? "You" : userData?.name || "other"}
          text={msg.content}
          avatar={
            msg.senderId === senderId
              ? currentUserData?.user.imgUrl || Images["default-avatar"]
              : userData?.imgUrl || Images["default-avatar"]
          }
          type={msg.messageType}
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
