import { useState } from "react";
import CustomInput from "../../CustomInput/CustomInput";
import styles from "./EditContactPopup.module.scss";
import useMyDetails from "@/hooks/Auth/useGetMyDetails";

interface EditContactPopupProps {
  onClose: () => void;
}
export default function EditContactPopup({ onClose }: EditContactPopupProps) {
  const { data: currentUserData } = useMyDetails();
  const [email, setEmail] = useState(currentUserData?.user.email);
  const [contact, setContact] = useState(currentUserData?.user.phone);
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.text}>
            <span>Edit Contact Information</span>
          </div>
          <button onClick={onClose} className={styles.closeButton}>
            ✕
          </button>
        </div>

        <div className={styles.inputContainer}>
          <CustomInput value={email || ""} onChange={(value) => setEmail(value)} />
          <CustomInput value={contact || ""} onChange={(value) => setContact(value)} />
        </div>
      </div>
    </div>
  );
}
