import Image from 'next/image'
import styles from './styles.module.scss'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

export default function Description({ blocks }: { blocks: PortableTextBlock[] }) {
	return (
		<section className={styles.descriptionSection}>
			<div className={styles.content}>
				<PortableText
					value={blocks}
					components={{
						marks: {
							link: ({ value, children }) => (
								<a
									href={value?.href}
									className={styles.link}
									target="_blank"
									rel="noopener noreferrer"
								>
									{children}
								</a>
							),
						},
					}}
				/>
			</div>
			<div className={styles.logoContainer}>
				<Image
					src="/mtl-bal-jam-logo-white.png"
					height={1584}
					width={1584}
					alt="MTL BAL JAM logo"
				/>
			</div>
		</section>
	)
}
