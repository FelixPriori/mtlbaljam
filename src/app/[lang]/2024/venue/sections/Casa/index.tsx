import styles from './styles.module.scss'
import Image from 'next/image'
import GoogleMaps from '@/app/[lang]/components/CustomGoogleMap'
import { DictionaryType } from '@/app/[lang]/dictionaries'

export default function Casa({
	casa,
}: {
	casa: DictionaryType['mbj2024']['venuePage']['casa']
}) {
	return (
		<section className={styles.mapSection}>
			<h2>{casa.title}</h2>
			<div className={styles.content}>
				<div className={styles.mapContainer}>
					<GoogleMaps
						lat={casa.position.lat}
						lng={casa.position.lng}
						markerTitle={casa.markerTitle}
						infoWindowText={casa.infoWindowText}
						mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MBJ_MAP_ID as string}
					/>
				</div>
				<div className={styles.text}>
					<h3>{casa.venueName}</h3>
					<p>{casa.venueDescription}</p>
					<p>{casa.venueAddress}</p>
					<a target="_blank" rel="norefferer" href={casa.venueWebsite}>
						{casa.venueWebsite}
					</a>
				</div>
			</div>
			<div className={styles.cutout}>
				<Image
					priority
					src="/casa-d-italia-cutout.png"
					alt={casa.cutoutAlt}
					width={688}
					height={362}
				/>
			</div>
		</section>
	)
}
