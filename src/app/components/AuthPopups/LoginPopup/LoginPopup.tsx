import { useState } from "react";
import styles from "./LoginPopup.module.scss";
import { righteous, roboto } from '../../../fonts';
import CustomInput from "../../CustomInput/CustomInput";
import useLogin from "@/hooks/Auth/useLogin";
import { useRouter } from "next/navigation";
interface LoginPopupProps {
  onClose: () => void;
  onOpenSignup: () => void;
}

export default function LoginPopup({ onClose, onOpenSignup }: LoginPopupProps) {
  const router = useRouter(); 
  const { login, isPending, isError, error } = useLogin(); 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleLogin = async () => {
    try {
      await login({ email: formData.email, password: formData.password });

      router.push('/home');
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className={styles.popup}>
      <div className={`${styles.container} ${roboto.variable}`}>
        <button onClick={onClose} className={styles.closeButton}>✕</button>
        <h2 className={`${styles.title} ${righteous.variable}`}>Login</h2>

        <CustomInput
          placeholder="Enter your email"
          value={formData.email}
          onChange={(value) => handleChange("email", value)}
          isError={!!errors.email}
          error={errors.email}
        />

        <CustomInput
          placeholder="Password"
          type="password"
          value={formData.password}
          onChange={(value) => handleChange("password",value)}
          isError={!!errors.password}
          error={errors.password}
        />

        {isError && <p className={styles.error}>{error?.message}</p>} {/* Display error message */}

        <p className={styles.forgotPassword}>Forgot Password?</p>
        <button className={styles.loginButton} onClick={handleLogin} disabled={isPending}>
          {isPending ? 'Logging in...' : 'Login'}
        </button>

        <div className={styles.separator}>
          <div className={styles.line}></div>
          <p>or</p>
          <div className={styles.line}></div>
        </div>

        <p className={styles.newAccount}>
          Create a new account
          <span onClick={onOpenSignup} className={styles.signupLink}> Signup</span>
        </p>
      </div>
    </div>
  );
}