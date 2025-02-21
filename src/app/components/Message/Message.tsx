"use client";

import Image, { StaticImageData } from "next/image";
import styles from "./Message.module.scss";

interface MessageProps {
  sender: string;
  text: string;
  avatar: string | StaticImageData;
  type?: "text" | "image";
}

export default function Message({ sender, text, avatar, type }: MessageProps) {
  return (
    <div className={styles.message}>
      <div className={styles.messageAvatar}>
        <Image src={avatar} alt={sender} width={50} height={50} />
      </div>
      <div className={styles.messageContent}>
        <span className={styles.messageSender}>{sender}</span>
        {type == "image" ? (
          <Image src={text} alt="image here" width={100} height={100} />
        ) : (
          <p className={styles.messageText} dangerouslySetInnerHTML={{ __html: text }}></p>
        )}
      </div>
    </div>
  );
}
