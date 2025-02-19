"use client";
import { Images } from "@/constants/images";
import Label from "../Label";
import styles from "./UsersDropdown.module.scss";
import { User } from "@/types/auth/interfaces";
import { useParams, usePathname, useRouter } from "next/navigation";

interface UsersDropdownProps {
  users: User[];
}

export default function UsersDropdown({ users }: UsersDropdownProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const checkActive = (id: number) => {
    if (pathname.includes("/home/user")) {
      if (id.toString() == params.id) return true;
    }
    return false;
  };

  return (
    <div className={styles.container}>
      {users.length > 0 &&
        users.map((user) => (
          <Label
            key={user.id}
            id={user.id}
            type={"user"}
            name={user.name}
            icon={user.imgUrl || Images["default-avatar"]}
            isActive={checkActive(user.id)}
          />
        ))}
    </div>
  );
}
