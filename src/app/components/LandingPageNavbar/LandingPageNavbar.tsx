import styles from "./LandingPageNavbar.module.scss";
import { roboto } from "../../fonts";
import Image from "next/image";
import { Images } from "@/constants/images";

export default function LandingPageNavbar() {
  return (
    <nav className={`${styles.navbar} ${roboto.variable}`}>
      <div className={styles.logo}>
        <Image
          src={Images.logo}
          alt={"logo here"}
          height={30}
          width={45}
          className={styles.image}
        />
      </div>
      <div className={styles.navigationWrapper}>
        <ul className={styles.navLinks}>
          <li>
            <a href="#">Privacy</a>
          </li>
          <li>
            <a href="#">Help Center</a>
          </li>
          <li>
            <a href="#">Pulse Web</a>
          </li>
          <li>
            <a href="#">Download</a>
          </li>
        </ul>
        <div>
          <button className={styles.button}>Try Pulse</button>
        </div>
      </div>
    </nav>
  );
}
