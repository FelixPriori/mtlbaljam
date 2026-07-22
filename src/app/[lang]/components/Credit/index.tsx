import type { ElementType } from 'react'
import TextLink from '@/app/[lang]/components/TextLink'

interface CreditProps {
	name: string
	url?: string | null
	as?: ElementType
	className?: string
}

/** A name, linked out to `url` when present — used for photographer/contributor credits. */
export default function Credit({ name, url, as: Tag = 'span', className }: CreditProps) {
	return (
		<Tag className={className}>
			{url ? <TextLink href={url}>{name}</TextLink> : name}
		</Tag>
	)
}
