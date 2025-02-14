import Image from "next/image";
import styles from "./Tab.module.scss"


interface TabProps {
    icon: string,
    name: string,
    url: string
}
export default function Tab({icon, name, url}:TabProps) {

    return(
        <div className={styles.container}>
            <Image
              src={icon}
              alt="icon"
              width={20}
              height={20}
              className={styles.icon}
            />
            <p className={styles.name}>{name}</p>
        </div>
    )
}