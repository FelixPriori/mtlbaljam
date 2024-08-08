'use client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import styles from './styles.module.scss'

const getDetails = (items: string) =>
	items?.split(',').map(detail => <li key={detail}>{detail}</li>)
const keys = ['register', 'edit', 'contact']

export default function Shirt() {
	const t = useTranslations('MtlBalJam.2024.extrasPage.shirt')

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
		<section className={styles.shirtSection}>
			<h2>{t('title')}</h2>
			<div className={styles.content}>
				<div className={styles.imageWrapper}>
					<Image
						src={t('imageSrc')}
						width={250}
						height={250}
						alt={t('imageAlt')}
					/>
				</div>
				<div className={styles.text}>
					<p className={styles.soldOutPrice}>{t('price')}</p>
					<p className={styles.soldOut}>{t('soldOut')}</p>
					<p className={styles.when}>{t('when')}</p>
					<div className={styles.description}>
						<p>{t('description')}</p>
						<ul>{getDetails(t('list'))}</ul>
						<p>
							{t.rich('credit', {
								link: chunks => (
									<a href={t('link')} rel="noopener noreferrer" target="_blank">
										{chunks}
									</a>
								),
							})}
						</p>
					</div>
					<div className={styles.instructions}>
						<h3>{t('how')}</h3>
						<ul>
							{keys.map(key => (
								<li key={key} className={styles.soldOutPrice}>
									{renderInstruction(key)}
								</li>
							))}
							<li className={styles.soldOut}>{t('instructions.soldOut')}</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	)
}
