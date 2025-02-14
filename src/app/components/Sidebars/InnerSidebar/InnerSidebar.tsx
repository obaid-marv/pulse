import { Images } from "@/constants/images";
import Tab from "./components/Tab";
import styles from "./InnerSidebar.module.scss";
import GroupDropdown from "./components/GroupDropdown";
import { IoIosArrowDown } from "react-icons/io";
import UsersDropdown from "./components/UsersDropdown/UsersDropdown";


export default function InnerSidebar() {
  return (
    <aside className={styles.innerSidebar}>
      <h2 className={styles.heading}>QLU Recruiting</h2>

      <div className={styles.tabContainer}>
        <Tab
          name={"Groups"}
          icon={Images.users}
          url=""
        />
        <Tab
          name={"Direct Messages"}
          icon={Images.chatBlue}
          url=""
        />        

      </div>

      <div className={styles.groups}>
        <p className={styles.title}>Groups <span><IoIosArrowDown /></span></p>
        <GroupDropdown/>
      </div>

      <div className={styles.users}>
        <p className={styles.title}>Direct Messages <span><IoIosArrowDown /></span></p>
        <UsersDropdown/>
      </div>

      

      
    </aside>
  );
}
