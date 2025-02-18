'use client';

import Image, { StaticImageData } from 'next/image';
import styles from './Message.module.scss';

interface MessageProps {
  sender: string;
  text: string;
  avatar: string | StaticImageData;
}

export default function Message({ sender, text, avatar }: MessageProps) {
  return (
    <div className={styles.message}>
      <div className={styles.messageAvatar}>
        <Image src={avatar} alt={sender} width={60} height={60} />
      </div>
      <div className={styles.messageContent}>
        <span className={styles.messageSender}>{sender}</span>
        <p className={styles.messageText}>{text}</p>
      </div>
    </div>
  );
}
