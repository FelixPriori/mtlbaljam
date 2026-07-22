import styles from './styles.module.scss'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import MtlBalJamLogo from '@/assets/svgs/mtlbaljam-logo'
import TextLink from '@/app/[lang]/components/TextLink'

export default function Description({ blocks }: { blocks: PortableTextBlock[] }) {
	return (
		<section className={styles.descriptionSection}>
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
			<div className={styles.logoContainer}>
				<MtlBalJamLogo />
			</div>
		</section>
	)
}
