"use client";

import { roboto } from "@/app/fonts";
import styles from "./EmailVerificationPopup.module.scss";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSignup, { useSignupData } from "@/hooks/Auth/useSignup";
import useVerifyEmail from "@/hooks/Auth/useVerifyEmail";

const EmailVerificationPopup = () => {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);

  const { data } = useSignupData();
  const { verify, isPending, isError, error } = useVerifyEmail(() => {
    router.push("/home");
  });

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
    if (nextInput && value) nextInput.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && otp[index] === "") {
      const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement;
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(data);
    if (data?.user) {
      await verify({ email: data.user.email, code: otp.join("") });
    }
  };

  return (
    <div className={styles.verifyPopup}>
      <div className={`${styles.container} ${roboto.variable}`}>
        <div className={styles.popupHeader}>
          <p className={styles.popupTitle}>Check your mailbox</p>
          <p className={styles.popupDescription}>Verify codes delivered to your inbox.</p>
        </div>

        <div className={styles.popupDivider}></div>

        <form className={styles.verifyForm} onSubmit={handleSubmit}>
          <div className={styles.otpInputs}>
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                className={styles.otpInput}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                inputMode="numeric"
              />
            ))}
          </div>
          {isPending && <p>Verifying...</p>}

          {isError && error && <p className={styles.errorMessage}>{error}</p>}
          <button type="submit" className={styles.submitBtn}>
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerificationPopup;
