import Link from 'next/link'
import Image from 'next/image'
import styles from './styles.module.scss'
import { DictionaryType } from '../../dictionaries'

export default function LogoLink({
	iconAlts,
}: {
	iconAlts: DictionaryType['iconAlts']
}) {
	return (
		<Link className={styles.logoWrapper} href="/">
			<Image
				src="/mtl-bal-jam-logo-black.png"
				alt={iconAlts.mbjLogo}
				width={1584}
				height={1584}
			/>
		</Link>
	)
}
