'use client';

import Image from 'next/image';
import styles from './Message.module.scss';

interface MessageProps {
  sender: string;
  text: string;
  avatar: string;
}

export default function Message({ sender, text, avatar }: MessageProps) {
  return (
    <div className={styles.message}>
      <div className={styles.messageAvatar}>
        <Image src={avatar} alt={sender} width={40} height={40} />
      </div>
      <div className={styles.messageContent}>
        <span className={styles.messageSender}>{sender}</span>
        <p className={styles.messageText}>{text}</p>
      </div>
    </div>
  );
}
