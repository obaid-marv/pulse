"use client"

import { useState } from 'react'
import styles from './ChatInput.module.scss'
import { Bold, Italic, Link, List, ListOrdered, Code, Plus, Type, Smile, Video, Mic, PenTool, Send } from 'lucide-react'

export default function MessageInput() {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      console.log('Message sent:', message)
      setMessage('')
    }
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.container}>
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
          onChange={(e) => setMessage(e.target.value)}
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
            <button type="button" className={styles.toolbarButton}>
              <PenTool size={20} />
            </button>
          </div>
          <button 
            type="submit" 
            className={`${styles.sendButton} ${message.trim() ? styles.active : ''}`}
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  )
}
