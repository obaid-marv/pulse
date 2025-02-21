"use client";

import styles from "./page.module.scss";
import { Images } from "@/constants/images";
import ChatSection from "@/app/components/ChatSection";
import { useParams } from "next/navigation";
import useAllUsers from "@/hooks/user/usegetAllUsers";
import { useEffect, useState } from "react";
import { AiFillCaretRight } from "react-icons/ai";

import { User } from "@/types/auth/interfaces";

export default function ChatPage() {
  const [chatUser, setChatUser] = useState<User>();
  const params = useParams();
  const recieverId = Array.isArray(params.id)
    ? parseInt(params.id[0])
    : params.id
      ? parseInt(params.id)
      : null;
  const { data: allUsers } = useAllUsers();

  useEffect(() => {
    if (allUsers?.success) {
      setChatUser(allUsers.users.find((user) => user.id == recieverId));
    }
  }, [allUsers]);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.text}>
          {chatUser?.name} <AiFillCaretRight />
        </span>
      </div>

      {chatUser?.id !== 0 && <ChatSection userData={chatUser} />}
    </div>
  );
}
