import { ReactNode } from 'react';
import styles from './styles.module.scss'

interface SkeletonProps {
    wrapperClass: string;
    boxClass: string;
    children?: ReactNode
}

export default function Skeleton({ wrapperClass, boxClass, children }: SkeletonProps) {
    return (
        <div className={`${styles.skeleton} ${wrapperClass ? wrapperClass : ''}`}>
            <div className={`${styles.pulse} ${boxClass} ${styles.box}`}>
                {children}
            </div>
        </div>
    )
}