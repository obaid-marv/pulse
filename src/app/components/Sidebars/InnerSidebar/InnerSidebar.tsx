"use client";
import { useEffect, useState } from "react";
import { Images } from "@/constants/images";
import Tab from "./components/Tab";
import styles from "./InnerSidebar.module.scss";
import GroupDropdown from "./components/GroupDropdown";
import { IoIosArrowDown } from "react-icons/io";
import UsersDropdown from "./components/UsersDropdown/UsersDropdown";
import useAllUsers from "@/hooks/user/usegetAllUsers";
import useMyDetails from "@/hooks/Auth/useGetMyDetails";

export default function InnerSidebar() {
  const [isGroupsOpen, setIsGroupsOpen] = useState(false);
  const [isUsersOpen, setIsUsersOpen] = useState(false);

  const { data: usersData, isPending, refetch } = useAllUsers();
  const { data: myData } = useMyDetails();

  useEffect(() => {
    if (!usersData && !isPending) refetch();
  }, [usersData, refetch]);

  const filteredUsers = usersData?.users.filter((user) => user.id != myData?.user.id);

  return (
    <aside className={styles.innerSidebar}>
      <h2 className={styles.heading}>QLU Recruiting</h2>

      <div className={styles.tabContainer}>
        <Tab name="Groups" icon={Images.users} url="" />
        <Tab name="Direct Messages" icon={Images.chatBlue} url="" />
      </div>

      <div className={styles.groups}>
        <p className={styles.title} onClick={() => setIsGroupsOpen(!isGroupsOpen)}>
          Groups{" "}
          <span className={`${styles.arrow} ${isGroupsOpen ? styles.open : ""}`}>
            <IoIosArrowDown />
          </span>
        </p>
        {isGroupsOpen && <GroupDropdown />}
      </div>

      <div className={styles.users}>
        <p className={styles.title} onClick={() => setIsUsersOpen(!isUsersOpen)}>
          Direct Messages{" "}
          <span className={`${styles.arrow} ${isUsersOpen ? styles.open : ""}`}>
            <IoIosArrowDown />
          </span>
        </p>
        {isUsersOpen && <UsersDropdown users={filteredUsers || []} />}
      </div>
    </aside>
  );
}
