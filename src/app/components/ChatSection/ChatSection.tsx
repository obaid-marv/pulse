'use client';

import Message from '../Message';
import styles from './ChatSection.module.scss';
import { Images } from '@/constants/images';

export default function ChatSection() {
  const messages = [
    {
      id: 1,
      sender: "Muhammad Salman",
      text: "The log rocket explains why we really need to consolidate and move to a single search barThe log rocket explains why we really need to consolidate and move to a single search bar...The log rocket explains why we really need to consolidate and move to a single search bar...The log rocket explains why we really need to consolidate and move to a single search bar..",
      
      avatar: Images.profileImg.src,
    },
    {
      id: 2,
      sender: "Ashir Manzoor",
      text: "Are you following up on these tickets being created?",
      avatar: Images.profileImg.src,
    },
  ];

  return (
    <div className={styles.chatSection}>
      {messages.map((msg) => (
        <Message key={msg.id} sender={msg.sender} text={msg.text} avatar={msg.avatar} />
      ))}
    </div>
  );
}
