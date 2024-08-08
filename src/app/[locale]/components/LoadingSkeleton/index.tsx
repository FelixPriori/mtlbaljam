"use client"
import styles from './styles.module.scss'
import { RotatingLines } from 'react-loader-spinner'

export default function LoadingSkeleton() {
    return (
        <div className={styles.loadingSkeleton}>
            <RotatingLines strokeColor='var(--mbj-color-white)' />
        </div>
    )
}