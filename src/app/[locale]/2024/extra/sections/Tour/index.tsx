'use client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import styles from './styles.module.scss'

const keys = ['register', 'edit', 'contact']

export default function Tour() {
	const t = useTranslations('MtlBalJam.2024.extrasPage.tour')

	const renderInstruction = (key: string) => {
		switch (key) {
			case 'register':
				return t.rich('instructions.register', {
					register: chunk => (
						<a
							rel="noopener noreferrer"
							target="_blank"
							href="https://mtl-bal-jam-2024.dancecamps.org/booking.php"
						>
							{chunk}
						</a>
					),
				})
			case 'contact':
				return t.rich('instructions.contact', {
					email: chunk => (
						<a
							rel="noopener noreferrer"
							target="_blank"
							href="mailto:mtlbaljam@campusbalboa.org"
						>
							{chunk}
						</a>
					),
				})
			default:
				return t('instructions.edit')
		}
	}

	return (
		<section className={styles.bandSection}>
			<h2>{t('title')}</h2>
			<div className={styles.content}>
				<div className={styles.imageWrapper}>
					<Image
						src="/mbj-guided-tour.png"
						width={250}
						height={250}
						alt={t('imageAlt')}
					/>
				</div>
				<div className={styles.text}>
					<p>{t('price')}</p>
					<p>{t('when')}</p>
					<p>{t('length')}</p>
					<p>{t('description')}</p>

					<div className={styles.instructions}>
						<h3>{t('how')}</h3>
						<ul>
							{keys.map(key => (
								<li key={key}>{renderInstruction(key)}</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
	)
}
