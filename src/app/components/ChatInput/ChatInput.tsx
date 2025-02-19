"use client";

import { useState } from "react";
import styles from "./ChatInput.module.scss";
import {
  Bold,
  Italic,
  Link,
  List,
  ListOrdered,
  Code,
  Plus,
  Type,
  Smile,
  Video,
  Mic,
  SendHorizonalIcon,
} from "lucide-react";

interface ChatInputProps {
  onChange: (message: string) => void;
  handleSubmit: () => void; // Handle submit function passed from the parent
}

export default function ChatInput({ onChange, handleSubmit }: ChatInputProps) {
  const [message, setMessage] = useState("");

  return (
    <div className={styles.wrapper}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (message.trim()) {
            handleSubmit();
            setMessage("");
          }
        }}
        className={styles.container}
      >
        <div className={styles.topToolbar}>
          <button type="button" className={styles.toolbarButton}>
            <Bold size={18} />
          </button>
          <button type="button" className={styles.toolbarButton}>
            <Italic size={18} />
          </button>
          <button type="button" className={styles.toolbarButton}>
            <Link size={18} />
          </button>
          <div className={styles.divider}></div>
          <button type="button" className={styles.toolbarButton}>
            <List size={18} />
          </button>
          <button type="button" className={styles.toolbarButton}>
            <ListOrdered size={18} />
          </button>
          <div className={styles.divider}></div>
          <button type="button" className={styles.toolbarButton}>
            <Code size={18} />
          </button>
        </div>

        <textarea
          className={styles.input}
          placeholder="Message...."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            onChange(e.target.value);
          }}
          rows={1}
        />

        <div className={styles.bottomToolbar}>
          <div className={styles.leftTools}>
            <button type="button" className={styles.toolbarButton}>
              <Plus size={20} />
            </button>
            <button type="button" className={styles.toolbarButton}>
              <Italic size={20} />
            </button>
            <button type="button" className={styles.toolbarButton}>
              <Type size={20} />
            </button>
            <button type="button" className={styles.toolbarButton}>
              <Smile size={20} />
            </button>
            <button type="button" className={styles.toolbarButton}>
              <Video size={20} />
            </button>
            <button type="button" className={styles.toolbarButton}>
              <Mic size={20} />
            </button>
          </div>
          <button
            type="submit"
            className={`${styles.sendButton} ${message.trim() ? styles.active : ""}`}
          >
            <SendHorizonalIcon size={20} color={"#06334D"} />
          </button>
        </div>
      </form>
    </div>
  );
}
