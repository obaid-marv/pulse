import Image, { StaticImageData } from "next/image";
import styles from "./Label.module.scss";
import { useRouter } from "next/navigation";
import { Span } from "next/dist/trace";

interface LabelProps {
  id?: number;
  type: string;
  name: string;
  icon?: string | StaticImageData;
  isActive?: boolean;
  online?: boolean;
  messageCount?: number;
}

export default function Label({
  id,
  type,
  name,
  icon,
  isActive,
  online,
  messageCount,
}: LabelProps) {
  const router = useRouter();
  const handleNavigate = () => {
    if (type == "user") router.push(`/home/user/${id}`);
    else router.push(`/home/group/${id}`);
  };
  return (
    <div onClick={handleNavigate} className={`${styles.container}  ${isActive && styles.active}`}>
      {type == "group" && <p className={styles.hash}>#</p>}

      {type == "user" && (
        <Image src={icon || ""} alt="icon" width={20} height={20} className={styles.icon} />
      )}
      <p className={styles.name}>{name}</p>
      {online && <span className={styles.onlineStatus}></span>}
      {type == "user" && <span>{messageCount != 0 ? messageCount : ""}</span>}
    </div>
  );
}
