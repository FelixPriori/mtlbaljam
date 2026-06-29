import Link from 'next/link'
import MtlBalJamLogo from '@/assets/svgs/mtlbaljam-logo'
import styles from './styles.module.scss'

export default function LogoLink({ logoAlt }: { logoAlt: string }) {
	return (
		<Link className={styles.logoWrapper} href="/" aria-label={logoAlt}>
			<MtlBalJamLogo />
		</Link>
	)
}
