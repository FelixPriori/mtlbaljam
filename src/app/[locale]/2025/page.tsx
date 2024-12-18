import { unstable_setRequestLocale } from 'next-intl/server'
import { redirect } from 'next/navigation'
type Props = {
	params: Promise<{ locale: string }>
}

export default async function Event2025({ params }: Props) {
	const { locale } = await params
	unstable_setRequestLocale(locale)
	redirect(`/${locale}/`)
}
