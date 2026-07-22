import styles from './styles.module.scss'
import GoogleMaps from '@/app/[lang]/components/CustomGoogleMap'
import TextLink from '@/app/[lang]/components/TextLink'
import { localize } from '@/lib/sanity/localize'
import type { SanityVenue } from '@/lib/sanity/queryTypes'
import type { Locales } from '@/i18n'

export default function Cats({
	venue,
	title,
	lang,
}: {
	venue: SanityVenue
	title: { en: string | null; fr: string | null } | null
	lang: Locales
}) {
	return (
		<section className={styles.mapSection}>
			{title && <h2>{localize(title, lang)}</h2>}
			<div className={styles.content}>
				{venue.position?.lat && venue.position?.lng && (
					<div className={styles.mapContainer}>
						<GoogleMaps
							lat={venue.position.lat}
							lng={venue.position.lng}
							markerTitle={venue.markerTitle ?? venue.name ?? ''}
							infoWindowText={venue.infoWindowText ?? venue.address ?? ''}
							mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MBJ_MAP_ID as string}
						/>
					</div>
				)}
				<div className={styles.text}>
					<h3>{venue.name}</h3>
					{localize(venue.description, lang)?.map((line) => (
						<p key={line}>{line}</p>
					))}
					{venue.address && <p>{venue.address}</p>}
					{venue.website && (
						<TextLink href={venue.website}>{venue.website}</TextLink>
					)}
				</div>
			</div>
		</section>
	)
}
