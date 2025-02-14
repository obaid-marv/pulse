import Image from "next/image";
import styles from "./OuterSidebar.module.scss";
import { Images } from "@/constants/images";
import NavigationButton from "./components";

export default function OuterSidebar() {
  return (
    <aside className={styles.outerSidebar}>
      <div className={styles.navigation}>
        
        <Image
          src={Images.minilogo}
          alt="pulse"
          width={60}
          height={60}
        />
        <div className={styles.linkContainer}>
          <NavigationButton
            name="Home"
            url="/home"
            icon={Images.home}
          />
          <NavigationButton
            name="Activity"
            url="/home"
            icon={Images.bell}
          />
          <NavigationButton
            name="DMs"
            url="/home"
            icon={Images.chat}
          />
          <NavigationButton
            name="More"
            url="/home"
            icon={Images.dots}
          />
        </div>


      </div>
      <div className={styles.profiling}>
        <Image
          src={Images.plus}
          alt="plus svg"
          className={styles.plus}
          width={20}
          height={20}
        />

        <Image
          src={Images.profileImg}
          alt="profile svg"
          className={styles.profile}
          width={40}
          height={40}
        />

      </div>
    </aside>
  );
}
