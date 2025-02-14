import { useState } from "react";
import styles from "./SignupPopup.module.scss";
import { righteous, roboto} from '../../../fonts'
import CustomInput from "../../CustomInput/CustomInput";

interface SignupPopupProps {
  onClose: () => void;
  onOpenLogin: () => void;
  showSuccess: () => void;
}

export default function SignupPopup({onClose, onOpenLogin, showSuccess} : SignupPopupProps) {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // Clear error when typing
  };

  return (
    <div className={styles.popup}>
      <div className={`${styles.container} ${roboto.variable}`}>
        <button
         onClick={onClose}
         className={styles.closeButton}
        
        >✕</button>
        <h2 className={`${styles.title} ${righteous.variable}`}>Signup</h2>

        <CustomInput
          placeholder="Enter your email"
          helperText="This is how other people see you. You can use special characters & emojis."
          isError={!!errors.email}
          error={errors.email}
        />

        <CustomInput
          placeholder="Username"
          helperText="Please only use numbers, letters, underscores, or periods."
          isError={!!errors.username}
          error={errors.username}
        />

        <CustomInput
          placeholder="Password"
          isError={!!errors.password}
          error={errors.password}
        />

        <CustomInput
          placeholder="Confirm Password"
          isError={!!errors.confirmPassword}
          error={errors.confirmPassword}
        />

        <button
          onClick={showSuccess}
          className={styles.loginButton}>Sign up</button>

        <div className={styles.separator}>
          <div className={styles.line}></div>
          <p>or</p>
          <div className={styles.line}></div>

        </div>

        <p className={styles.alreadyAccount}>
          Already have an account? <span
           onClick={onOpenLogin}
           className={styles.loginLink}>Login</span>
        </p>
      </div>
    </div>
  );
}
