import { Locales } from '@/i18n'
import { redirect } from 'next/navigation'

export default async function Event2025({
	params,
}: {
	params: Promise<{ lang: Locales }>
}) {
	const { lang } = await params
	redirect(`/${lang}/`)
}
