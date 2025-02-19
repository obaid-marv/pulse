"use client";
import styles from "./HeroSection.module.scss";
import { righteous, roboto } from "../../fonts";
import Image from "next/image";
import { Images } from "@/constants/images";
import { useState } from "react";
import LoginPopup from "../AuthPopups/LoginPopup";
import SignupPopup from "../AuthPopups/SignupPopup";
import ConfirmationPopup from "../AuthPopups/ConfirmationPopup";
import EmailVerificationPopup from "../AuthPopups/EmailVerificationPopup";

export default function HeroSection() {
  const [signupPopup, setSignupPopup] = useState(false);
  const [loginPopup, setLoginPopup] = useState(false);
  const [emailConfirmation, setEmailConfirmation] = useState(false);
  const [emailVerificationPopup, setEmailVerificationPopup] = useState(false);

  const openLogin = () => {
    setSignupPopup(false);
    setLoginPopup(true);
  };

  const openSignup = () => {
    setSignupPopup(true);
    setLoginPopup(false);
  };

  const showEmailPopup = () => {
    setSignupPopup(false);
    setEmailConfirmation(true);
    setTimeout(() => {
      setEmailConfirmation(false);
      setEmailVerificationPopup(true);
    }, 2000);
  };

  return (
    <>
      <div className={`${styles.hero} ${roboto.variable}`}>
        <div className={styles.hero__text}>
          <p className={`${styles.hero__title} ${righteous.variable}`}>
            Communicate, Anywhere, Anytime
          </p>
          <p className={`${styles.hero__description} ${roboto.variable}`}>
            Connect effortlessly across all devices with Pulse. Break free from limitations and
            redefine communication, anytime, anywhere.
          </p>
          <div className={`${styles.hero__button__wrapper} ${roboto.variable}`}>
            <button onClick={openSignup} className={styles.hero__button__signup}>
              Signup
            </button>
            <button onClick={openLogin} className={styles.hero__button__login}>
              Login
            </button>
          </div>
        </div>
        <div className={styles.hero__illustration}>
          <Image
            src={Images["hero-image"]}
            alt="hero-illustration"
            width={400}
            height={400}
            className={styles.hero__image}
          />
        </div>
      </div>

      {signupPopup && (
        <SignupPopup
          onClose={() => setSignupPopup(false)}
          onOpenLogin={openLogin}
          showSuccess={showEmailPopup}
        />
      )}
      {loginPopup && <LoginPopup onClose={() => setLoginPopup(false)} onOpenSignup={openSignup} />}
      {emailConfirmation && <ConfirmationPopup onClose={() => setEmailConfirmation(false)} />}

      {emailVerificationPopup && <EmailVerificationPopup />}
    </>
  );
}
