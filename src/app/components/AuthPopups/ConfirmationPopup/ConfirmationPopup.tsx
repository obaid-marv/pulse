import { useState } from "react";
import styles from "./LoginPopup.module.scss";
import { righteous, roboto} from '../../../fonts'
import CustomInput from "../../CustomInput/CustomInput";
import Image from "next/image";

interface ConfirmationPopupProps {
  email: string,
  onClose: () => void
}

export default function LoginPopup({ email, onClose } : ConfirmationPopupProps) {
  

  return (
    <div className={styles.popup}>
      <div className={`${styles.container} ${roboto.variable}`}>
        <button
         onClick={onClose}
         className={styles.closeButton}
        
        >✕</button>
        <Image
            src={""}
            alt={"mail illustration"}
            width={80}
            height={80}
            className={styles.mailImage}        
        />

        <p className={styles.newAccount}>
          Open gmail
        </p>
      </div>
    </div>
  );
}
