import styles from './styles.module.scss'
import FeatureCard from '@/app/[lang]/components/FeatureCard'
import { urlFor } from '@/lib/sanity/image'
import { localize } from '@/lib/sanity/localize'
import type { SanityStaffMember } from '@/lib/sanity/queryTypes'
import type { Locales } from '@/i18n'

export default function StaffSection({
	title,
	currentTeamTitle,
	pastTeamTitle,
	members,
	lang,
}: {
	title: string
	currentTeamTitle: string
	pastTeamTitle: string
	members: SanityStaffMember[]
	lang: Locales
}) {
	const current = members.filter(m => m.isCurrent)
	const alumni = members.filter(m => !m.isCurrent)

	function renderGroup(group: SanityStaffMember[]) {
		return (
			<div className={styles.cards}>
				{group.map(member => (
					<FeatureCard
						key={member._id}
						name={member.name ?? ''}
						image={
							member.photo?.asset
								? {
										src: urlFor(member.photo).width(300).height(300).fit('crop').url(),
										alt: member.name ?? '',
									}
								: { src: '', alt: member.name ?? '' }
						}
						isH4
					>
						{member.pronouns && <p className={styles.pronouns}>{localize(member.pronouns, lang)}</p>}
						{member.role && <p className={styles.role}>{localize(member.role, lang)}</p>}
					</FeatureCard>
				))}
			</div>
		)
	}

	return (
		<section className={styles.staffSection}>
			<h2 className={styles.title}>{title}</h2>
			<div className={styles.content}>
				{current.length > 0 && (
					<>
						<h3>{currentTeamTitle}</h3>
						{renderGroup(current)}
					</>
				)}
				{alumni.length > 0 && (
					<>
						<h3>{pastTeamTitle}</h3>
						{renderGroup(alumni)}
					</>
				)}
			</div>
		</section>
	)
}
