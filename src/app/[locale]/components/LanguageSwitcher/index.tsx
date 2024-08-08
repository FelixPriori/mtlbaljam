'use client'
import { usePathname, useRouter } from '@/navigation'
import PillRadio from '../PillRadio'
import { useLocale } from 'next-intl'

export default function LanguageSwitcher() {
	const pathname = usePathname()
	const router = useRouter()
	const locale = useLocale()
	return (
		<PillRadio
			options={[
				{
					onClick: () => router.push(pathname, { locale: 'en' }),
					name: 'EN',
					active: locale === 'en',
				},
				{
					onClick: () => router.push(pathname, { locale: 'fr' }),
					name: 'FR',
					active: locale === 'fr',
				},
			]}
		/>
	)
}
