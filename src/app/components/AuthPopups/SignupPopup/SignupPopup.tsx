import { useEffect, useState } from "react";
import styles from "./SignupPopup.module.scss";
import { righteous, roboto } from "../../../fonts";
import CustomInput from "../../CustomInput/CustomInput";
import useSignup from "@/hooks/Auth/useSignup";
import { error, validationError } from "@/types/errors";

interface SignupPopupProps {
  onClose: () => void;
  onOpenLogin: () => void;
  showSuccess: () => void;
}

interface FormData {
  email: string;
  username: string;
  password: string;
  name: string;
}

export default function SignupPopup({ onClose, onOpenLogin, showSuccess }: SignupPopupProps) {
  const { signup, isPending, isError, error } = useSignup();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    username: "",
    password: "",
    name: "",
  });

  const [errors, setErrors] = useState<FormData>({
    email: "",
    username: "",
    password: "",
    name: "",
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await signup(formData);
      showSuccess();
    } catch (err: validationError | any) {
      if (Array.isArray(err.response.data.errors)) {
        const defaultErrors: FormData = {
          email: "",
          username: "",
          password: "",
          name: "",
        };
        const newErrors: Partial<FormData> = {};
        err.response.data.errors.forEach((error: error) => {
          if (error.path.length > 0) {
            const fieldName = error.path[0] as keyof FormData;
            newErrors[fieldName] = error.message;
          }
        });

        setErrors({ ...defaultErrors, ...newErrors });
      }
    }
  };

  return (
    <div className={styles.popup}>
      <div className={`${styles.container} ${roboto.variable}`}>
        <button onClick={onClose} className={styles.closeButton}>
          ✕
        </button>
        <h2 className={`${styles.title} ${righteous.variable}`}>Signup</h2>

        <CustomInput
          placeholder="Enter your email"
          isError={!!errors.email}
          error={errors.email}
          value={formData.email}
          onChange={(value) => handleChange("email", value)}
          type="email"
        />

        <CustomInput
          placeholder="Name"
          helperText="This is how other people see you. You can use special characters & emojis."
          isError={!!errors.name}
          error={errors.name}
          value={formData.name}
          onChange={(value) => handleChange("name", value)}
        />

        <CustomInput
          placeholder="Username"
          helperText="Please only use numbers, letters, underscores, or periods."
          isError={!!errors.username}
          error={errors.username}
          value={formData.username}
          onChange={(value) => handleChange("username", value)}
        />

        <CustomInput
          placeholder="Password"
          isError={!!errors.password}
          error={errors.password}
          type="password"
          value={formData.password}
          onChange={(value) => handleChange("password", value)}
        />

        {isPending && <p>Signing up...</p>}

        {isError && error && <p className={styles.errorMessage}>{error.message}</p>}

        <button
          onClick={(e) => handleSubmit(e)}
          className={styles.loginButton}
          disabled={isPending}
        >
          Sign up
        </button>

        <div className={styles.separator}>
          <div className={styles.line}></div>
          <p>or</p>
          <div className={styles.line}></div>
        </div>

        <p className={styles.alreadyAccount}>
          Already have an account?{" "}
          <span onClick={onOpenLogin} className={styles.loginLink}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
