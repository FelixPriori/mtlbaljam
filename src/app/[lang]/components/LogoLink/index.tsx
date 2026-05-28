import Link from 'next/link'
import Image from 'next/image'
import styles from './styles.module.scss'

export default function LogoLink({ logoAlt }: { logoAlt: string }) {
	return (
		<Link className={styles.logoWrapper} href="/">
			<Image
				src="/mtl-bal-jam-logo-black.png"
				alt={logoAlt}
				width={1584}
				height={1584}
			/>
		</Link>
	)
}
