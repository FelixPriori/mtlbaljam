import { ReactNode } from 'react';
import clsx from 'clsx'
import styles from './styles.module.scss'

interface SkeletonProps {
    wrapperClass: string;
    boxClass: string;
    children?: ReactNode
}

export default function Skeleton({ wrapperClass, boxClass, children }: SkeletonProps) {
    return (
        <div className={clsx(styles.skeleton, wrapperClass)}>
            <div className={clsx(styles.pulse, boxClass, styles.box)}>
                {children}
            </div>
        </div>
    )
}