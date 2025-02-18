"use client"

import Image from "next/image"
import Link from "next/link"
import styles from "./page.module.scss"
import { Images } from "@/constants/images"
import ChatSection from "@/app/components/ChatSection"
import { useParams } from "next/navigation"
import useAllUsers from "@/hooks/user/usegetAllUsers"
import { useEffect, useState } from "react"
import { AiFillCaretRight } from "react-icons/ai";

import { User } from "@/types/auth/interfaces"

export default function ChatPage() {
  const [chatUser, setChatUser] = useState<User>(); 
  const params = useParams()
  const recieverId = Array.isArray(params.id) ? parseInt(params.id[0]) : params.id ? parseInt(params.id) : null;
  const { data: allUsers } = useAllUsers();

  useEffect(()=>{
    if(allUsers?.success){
      setChatUser(allUsers.users.find((user) => user.id==recieverId))
    }

  }, [allUsers])
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.text}>{chatUser?.name} <AiFillCaretRight/></span>

      </div>
      <div className={styles.profileSection}>
        <div className={styles.profileInfo}>
          <div className={styles.imageWrapper}>
            <Image
              src={Images.profileImg.src}
              alt="Profile"
              width={140}
              height={140}
              className={styles.profileImage}
            />
            <span className={styles.onlineStatus}></span>
          </div>
          <div className={styles.profileText}>
            <h1 className={styles.name}>{chatUser?.name}</h1>
            <p className={styles.description}>
              This conversation is between <Link href="/profile">@{chatUser?.name}</Link> and you. Checkout their profile
              to know more about them.
            </p>
          </div>
          <Link href={'/'} className={styles.viewProfileButton}>
            View Profile
          </Link>
        </div>
        
      </div>

      <ChatSection userData={chatUser}/>
  
    </div>
  )
}

