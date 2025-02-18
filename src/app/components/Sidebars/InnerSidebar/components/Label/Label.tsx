import Image from 'next/image';
import styles from './Label.module.scss'
import { useRouter } from 'next/navigation';


interface LabelProps {
    id?: number;
    type: string;
    name: string;
    icon?: string;
    isActive?: boolean;
}

export default function Label ({id ,type, name, icon, isActive}: LabelProps) {
    const router = useRouter()
    const handleNavigate = () => {
        if(type=="user")
          router.push(`/home/user/${id}`);
    }
    return(
        <div
         onClick={handleNavigate}
         className={`${styles.container}  ${isActive && styles.active}`}
        >
            {type=="group" &&
                <p className={styles.hash}>#</p>
            }

            {type=="user" &&
                <Image 
                    src={icon || ""}
                    alt='icon'
                    width={20}
                    height={20}
                    className={styles.icon}
                />
            }
            <p className={styles.name}>{name}</p>
        </div>
    )
}