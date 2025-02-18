"use client"

import Image from "next/image"
import Link from "next/link"
import styles from "./page.module.scss"
import { Images } from "@/constants/images"
import ChatInput from "@/app/components/ChatInput"
import ChatSection from "@/app/components/ChatSection"

export default function ChatPage() {
  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <div className={styles.profileInfo}>
          <div className={styles.imageWrapper}>
            <Image
              src={Images.profileImg.src}
              alt="Profile"
              width={180}
              height={180}
              className={styles.profileImage}
            />
            <span className={styles.onlineStatus}></span>
          </div>
          <div className={styles.profileText}>
            <h1 className={styles.name}>Muhammad Salman</h1>
            <p className={styles.description}>
              This conversation is between <Link href="/profile">@Muhammad Salman</Link> and you. Checkout their profile
              to know more about them.
            </p>
          </div>
          <Link href="/profile" className={styles.viewProfileButton}>
          View Profile
          </Link>
        </div>
        
      </div>

      <ChatSection/>
      <ChatInput/>
    </div>
  )
}

