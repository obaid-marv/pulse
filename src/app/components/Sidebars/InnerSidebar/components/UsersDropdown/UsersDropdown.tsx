
import { Images } from '@/constants/images'
import Label from '../Label'
import styles from './UsersDropdown.module.scss'

export default function UsersDropdown() {

    return(
        <div className={styles.container}>
            <Label
                type='user'
                name='Obaid Ur Rehman'
                icon={Images.profileImg.src}
            />
            <Label
                type='user'
                name='Obaid Ur Rehman'
                icon={Images.profileImg.src}
            />
            
            <Label
                type='user'
                name='Obaid Ur Rehman'
                icon={Images.profileImg.src}
            />
            <Label
                type='user'
                name='Obaid Ur Rehman'
                icon={Images.profileImg.src}
            />
            
        </div>
    )
}