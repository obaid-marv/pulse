import Image from "next/image";
import styles from "./OuterSidebar.module.scss";
import { Images } from "@/constants/images";

export default function OuterSidebar() {
  return (
    <aside className={styles.outerSidebar}>
      <div className={styles.navigation}>
        
        <Image
          src={Images.minilogo}
          alt="pulse"
          width={40}
          height={40}
        />
        <div className={styles.linkContainer}>
          
        </div>


      </div>
      <div className={styles.profiling}>

      </div>
    </aside>
  );
}
