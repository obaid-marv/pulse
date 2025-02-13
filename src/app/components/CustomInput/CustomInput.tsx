'use client'
import { useState } from "react";
import styles from "./CustomInput.module.scss";
import { righteous, roboto } from '../../fonts';



interface CustomInputProps {
  placeholder?: string;
  helperText?: string;
  isError?: boolean;
  error?: string;
}

export default function CustomInput({
  placeholder = "Enter text...",
  helperText,
  isError = false,
  error,
}: CustomInputProps) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`${styles.inputContainer} ${roboto.variable}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`${styles.input} ${value ? styles.filled : ""} ${
          isError ? styles.error : ""
        }`}
        placeholder={placeholder}
      />
      {isError ? (
        <p className={`${styles.helperText} ${styles.errorText}`}>{error}</p>
      ) : (
        helperText && isFocused && <p className={styles.helperText}>{helperText}</p>
      )}
    </div>
  );
}
