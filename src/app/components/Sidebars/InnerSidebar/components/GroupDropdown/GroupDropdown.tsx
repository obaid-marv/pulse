import Label from '../Label'
import styles from './GroupDropdown.module.scss'

export default function GroupDropdown() {

    return(
        <div className={styles.container}>
            <Label
                type='group'
                name='log rocket group'
            />
            <Label
                type='group'
                name='log rocket group'
            />
            <Label
                type='group'
                name='log rocket group'
            />
            <Label
                type='group'
                name='log rocket group'
            />
        </div>
    )
}