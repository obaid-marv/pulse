"use client";
import { useRouter } from "next/navigation";
import styles from "./NavigationButton.module.scss";
import Image from "next/image";

interface NavigationButtonProps {
  name: string;
  url: string;
  icon: string;
}

export default function NavigationButton({ name, url, icon }: NavigationButtonProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push(url);
  };
  return (
    <div onClick={handleClick} className={styles.container}>
      <Image src={icon} alt="icon" width={25} height={25} className={styles.icon} />
      <p className={styles.name}>{name}</p>
    </div>
  );
}
