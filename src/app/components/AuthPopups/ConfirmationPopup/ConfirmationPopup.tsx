import { useState } from "react";
import styles from "./Confirmation.module.scss";
import { righteous, roboto} from '../../../fonts'
import Image from "next/image";
import { Images } from "@/constants/images";

interface ConfirmationPopupProps {
  email?: string,
  onClose: () => void
}

export default function ConfirmationPopup({ email = "o.rehman@qlu.ai", onClose } : ConfirmationPopupProps) {
  

  return (
    <div className={styles.popup}>
      <div className={`${styles.container} ${roboto.variable}`}>
        <button
         onClick={onClose}
         className={styles.closeButton}
        
        >✕</button>
        <Image
            src={Images["emai-image"]}
            alt={"mail illustration"}
            width={80}
            height={80}
            className={styles.mailImage}        
        />
        <p className={`${styles.successText}`}>
          Thanks! we have sent a confirmation email to {email}
        </p>
        <p className={styles.newAccount}>
          <span>
            <Image
              src={Images.gmail}
              alt="svg"
              height={20}
              width={25}
            />
          </span>Open gmail
        </p>
      </div>
    </div>
  );
}
