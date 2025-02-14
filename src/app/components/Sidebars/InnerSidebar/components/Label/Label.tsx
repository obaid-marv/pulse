import Image from 'next/image';
import styles from './Label.module.scss'


interface LabelProps {
    type: string;
    name: string;
    icon?: string;
}

export default function Label ({type, name, icon}: LabelProps) {

    return(
        <div className={styles.container}>
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