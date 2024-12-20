import styles from './styles.module.scss'

type EventProps = {
    title: string;
    time: string;
    location: string;
    type: string;
}

export default function Event({ title, time, location, type }: EventProps) {
    return (
        <li className={`${styles.event} ${styles[type]}`}>
            <div className={styles.time}>
                <p>{time}</p>
            </div>
            <h4>{title}</h4>
            <p className={styles.location}>{location}</p>
        </li>
    )
}