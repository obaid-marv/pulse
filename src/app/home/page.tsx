import Image from "next/image";
import styles from "./page.module.scss";
import { Images } from "@/constants/images";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src={Images.splash}
          alt="splash svg"
          width={500}
          height={500}      
          className={styles.splashImage}
        />

      </div>
      <div className={styles.splashText}>
        <Image
          src={Images.pulse}
          alt="pulse"
          width={70}
          height={40}
          className={styles.titleImage}
        />
        <p className={styles.description}>Connect, Communicate, Create</p>
        <p className={styles.description}>Your journey with pulse begins here!</p>

      </div>
    </div>
  );
}
