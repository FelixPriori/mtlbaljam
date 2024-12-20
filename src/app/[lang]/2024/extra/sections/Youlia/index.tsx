import Image from 'next/image'
import styles from './styles.module.scss'
import { DictionaryType } from '@/app/[lang]/dictionaries'

export default function Youlia({
	youlia,
}: {
	youlia: DictionaryType['mbj2024']['extrasPage']['youlia']
}) {
	const contactLink = `
		<a
			rel="noopener noreferrer"
			target="_blank"
			href="https://docs.google.com/forms/d/16rP3zeutwCXnfmboQqK5cbCoiaEoJd83wWgsfwsqo50/viewform?edit_requested=true"
		>${youlia.contact}</a>
	`
	const orderLink = `
		<a
			rel="noopener noreferrer"
			target="_blank"
			href="https://www.etsy.com/ca/listing/1715401501/acrylic-hoop-earrings-laser-cut-earrings"
		>${youlia.order}</a>
	`

	const instaLink = `<a
			rel="noopener noreferrer"
			target="_blank"
			href="https://www.instagram.com/youlia.moments/"
		>${youlia.insta}</a>
	`

	const renderLineDescription = (line: string): string => {
		return line
			.replace('{{insta}}', instaLink)
			.replace('{{order}}', orderLink)
			.replace('{{contact}}', contactLink)
	}

	return (
		<section className={styles.youliaSection}>
			<h2>{youlia.title}</h2>
			<div className={styles.content}>
				<div className={styles.imagesWrapper}>
					<Image
						className={styles.secondImage}
						src={youlia.sketchImageSrc}
						width={1920}
						height={1920}
						alt={youlia.sketchImageAlt}
					/>
					<Image
						className={styles.firstImage}
						src={youlia.earringImageSrc}
						width={1920}
						height={1920}
						alt={youlia.earringImageAlt}
					/>
				</div>
				<div className={styles.text}>
					<div className={styles.description}>
						{youlia.description.map(line => (
							<p
								key={line}
								dangerouslySetInnerHTML={{
									__html: renderLineDescription(line),
								}}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
