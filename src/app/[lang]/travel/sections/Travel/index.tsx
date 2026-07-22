import styles from './styles.module.scss'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import TextLink from '@/app/[lang]/components/TextLink'

export default function Travel({ blocks }: { blocks: PortableTextBlock[] }) {
	return (
		<section className={styles.travelSection}>
			<div className={styles.content}>
				<PortableText
					value={blocks}
					components={{
						marks: {
							link: ({ value, children }) => (
								<TextLink href={value?.href ?? ''}>{children}</TextLink>
							),
						},
					}}
				/>
			</div>
		</section>
	)
}
