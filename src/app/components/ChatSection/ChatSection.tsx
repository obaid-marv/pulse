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
import { myDetails } from "@/api/auth/authApi";

interface ChatSectionProps {
  userData?: User;
}

export default function ChatSection({ userData }: ChatSectionProps) {
  const { data: currentUserData } = useMyDetails();
  const senderId = currentUserData?.user.id || 0;

  const receiverId = userData?.id || 0;

  const { data: prevMessagesData, isPending, refetch } = usePreviousMessages(senderId, receiverId);
  const socket = useSocket();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<MessageData[]>([]);

  const handleMessageChange = (newMessage: string) => {
    setMessage(newMessage);
  };

  const handleSendMessage = () => {
    if (!socket || !message.trim() || !senderId || !receiverId) return;

    const newMessage: MessageData = {
      id: Date.now(),
      senderId,
      receiverId,
      content: message,
      messageType: "text",
    };

    socket.emit("sendMessage", newMessage);
    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
  };

  useEffect(() => {
    if (!socket) return;

    const receiveMessageHandler = (newMessage: MessageData) => {
      setMessages((prev) => [...prev, newMessage]);
    };

    socket.on("receiveMessage", receiveMessageHandler);

    return () => {
      socket.off("receiveMessage", receiveMessageHandler);
    };
  }, [socket]);

  useEffect(() => {
    if (!prevMessagesData && !isPending) {
      refetch();
    }
    if (prevMessagesData?.success && !isPending) {
      setMessages(prevMessagesData.messages);
    }
  }, [prevMessagesData, refetch, isPending]);

  if (!socket) return <div>Loading...</div>;

  return (
    <div className={styles.chatSection}>
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
        />
      ))}

      <ChatInput onChange={handleMessageChange} handleSubmit={handleSendMessage} />
    </div>
  );
}
