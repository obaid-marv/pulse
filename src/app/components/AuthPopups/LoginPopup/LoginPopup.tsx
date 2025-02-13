import { useState } from "react";
import styles from "./LoginPopup.module.scss";
import { righteous, roboto} from '../../../fonts'
import CustomInput from "../../CustomInput/CustomInput";

interface LoginPopupProps {
  onClose: () => void;
  onOpenSignup: () => void;
}

export default function LoginPopup({onClose, onOpenSignup} : LoginPopupProps) {
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
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <div className={styles.popup}>
      <div className={`${styles.container} ${roboto.variable}`}>
        <button
         onClick={onClose}
         className={styles.closeButton}
        
        >✕</button>
        <h2 className={`${styles.title} ${righteous.variable}`}>Login</h2>

        <CustomInput
          placeholder="Enter your email"
          isError={!!errors.email}
          error={errors.email}
          
        />

        <CustomInput
          placeholder="Password"
          isError={!!errors.password}
          error={errors.password}
        />

        <p className={styles.forgotPassword}>Forgot Password?</p>
        <button className={styles.loginButton}>Login</button>

        <div className={styles.separator}>
          <div className={styles.line}></div>
          <p>or</p>
          <div className={styles.line}></div>

        </div>

        <p className={styles.newAccount}>
          Create a new account
          <span
           onClick={onOpenSignup}
           className={styles.signupLink}> Signup</span>
        </p>
      </div>
    </div>
  );
}
