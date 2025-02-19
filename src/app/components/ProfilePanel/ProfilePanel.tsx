"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./ProfilePanel.module.scss";
import { Images } from "@/constants/images";
import useMyDetails from "@/hooks/Auth/useGetMyDetails";

interface ProfilePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfilePanel({ isOpen, onClose }: ProfilePanelProps) {
  const { data: currentUserData } = useMyDetails();

  return (
    <div className={`${styles.profilePanel} ${isOpen ? styles.open : ""}`}>
      <div className={styles.header}>
        <h2>Profile</h2>
        <button onClick={onClose} className={styles.closeButton}>
          ✕
        </button>
      </div>
      <div className={styles.content}>
        <div className={styles.imageWrapper}>
          <Image
            src={currentUserData?.user.imgUrl || Images["default-avatar"]}
            alt="Profile Picture"
            width={200}
            height={200}
            className={styles.avatar}
          />
        </div>
        <div className={styles.namingContainer}>
          <div className={styles.namingDiv}>
            <h3 className={styles.name}>{currentUserData?.user.name}</h3>
            <p className={styles.username}>@{currentUserData?.user.username}</p>
          </div>
          <div className={styles.editButton}>
            <span>Edit</span>
          </div>
        </div>

        <p className={styles.status}>Status will be shown here when a user sets a status.</p>
        <div className={styles.namingContainer}>
          <div className={styles.namingDiv}>
            <h3 className={styles.email}>Email</h3>
            <p className={styles.email}>@{currentUserData?.user.email}</p>
          </div>
          <div className={styles.editButton}>
            <span>Edit</span>
          </div>
        </div>
        <div className={styles.info}>
          <strong>Contact:</strong> {currentUserData?.user.phone || "No contact provided!"}
        </div>
      </div>
    </div>
  );
}
