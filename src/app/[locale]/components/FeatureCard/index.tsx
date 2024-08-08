import Image from 'next/image'
import styles from './styles.module.scss'
import LinesCircle from '@/assets/svgs/lines-circle'
import { ReactNode } from 'react'

interface FeatureCardProps {
	name: string
	image: {
		src: string
		alt: string
	}
	children?: ReactNode
	isH4?: boolean
}

export default function FeatureCard({
	name,
	image,
	isH4,
	children,
}: FeatureCardProps) {
	return (
		<div className={styles.featureCard}>
			<div className={styles.linesCircle}>
				<LinesCircle />
			</div>

			<div className={styles.imgWrapper}>
				<Image src={image.src} alt={image.alt} width={150} height={150} />
			</div>
			<div className={styles.details}>
				{isH4 ? (
					<h4 className={styles.name}>{name}</h4>
				) : (
					<h3 className={styles.name}>{name}</h3>
				)}
				{children && <div className={styles.content}>{children}</div>}
			</div>
		</div>
	)
}
