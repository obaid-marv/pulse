"use client";
import { useState } from "react";
import styles from "./CustomInput.module.scss";
import { righteous, roboto } from "../../fonts";

interface CustomInputProps {
  placeholder?: string;
  helperText?: string;
  isError?: boolean;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}

export default function CustomInput({
  placeholder = "Enter text...",
  helperText,
  isError = false,
  error,
  value,
  onChange,
  type = "text",
}: CustomInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // if (type === "email" && newValue && !newValue.endsWith("@qlu.ai")) {
    //   setEmailError("Email must be in the format example@qlu.ai");
    // } else {
    //   setEmailError(null);
    // }

    onChange(newValue);
  };

  return (
    <div className={`${styles.inputContainer} ${roboto.variable}`}>
      <input
        type={type}
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`${styles.input} ${value ? styles.filled : ""} ${isError || emailError ? styles.error : ""}`}
        placeholder={placeholder}
        required
      />
      {emailError ? (
        <p className={`${styles.helperText} ${styles.errorText}`}>{emailError}</p>
      ) : isError ? (
        <p className={`${styles.helperText} ${styles.errorText}`}>{error}</p>
      ) : (
        helperText && isFocused && <p className={styles.helperText}>{helperText}</p>
      )}
    </div>
  );
}
