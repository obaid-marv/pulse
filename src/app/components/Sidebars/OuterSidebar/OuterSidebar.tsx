import { useState } from "react";
import Image from "next/image";
import styles from "./OuterSidebar.module.scss";
import { Images } from "@/constants/images";
import NavigationButton from "./components";
import ProfilePanel from "@/app/components/ProfilePanel";
import { IoLogOutOutline } from "react-icons/io5";
import useLogout from "@/hooks/Auth/useLogout";
import EditContactPopup from "../../EditPopups/EditContactPopup";

export default function OuterSidebar() {
  const [openEditContact, setOpenEditContact] = useState(false);
  const { logout } = useLogout();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <aside className={styles.outerSidebar}>
        <div className={styles.navigation}>
          <Image src={Images.minilogo} alt="pulse" width={60} height={60} />
          <div className={styles.linkContainer}>
            <NavigationButton name="Home" url="/home" icon={Images.home} />
            <NavigationButton name="Activity" url="/home" icon={Images.bell} />
            <NavigationButton name="DMs" url="/home" icon={Images.chat} />
            <NavigationButton name="More" url="/home" icon={Images.dots} />
          </div>
        </div>
        <div className={styles.profiling}>
          <IoLogOutOutline onClick={() => logout()} className={styles.logout} size={40} />
          <Image src={Images.plus} alt="plus svg" className={styles.plus} width={20} height={20} />
          <Image
            src={Images.profileImg}
            alt="profile"
            className={styles.profile}
            width={40}
            height={40}
            onClick={() => setIsProfileOpen(true)}
          />
        </div>
      </aside>

      <ProfilePanel
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        openEditContact={() => setOpenEditContact(true)}
        openEditProfile={() => {}}
      />
      {openEditContact && <EditContactPopup onClose={() => setOpenEditContact(false)} />}
    </>
  );
}
