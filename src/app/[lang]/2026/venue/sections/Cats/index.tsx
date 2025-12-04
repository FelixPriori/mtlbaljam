import styles from './styles.module.scss'
import Image from 'next/image'
import GoogleMaps from '@/app/[lang]/components/CustomGoogleMap'
import { DictionaryType } from '@/app/[lang]/dictionaries'

export default function Cats({
	cats,
}: {
	cats: DictionaryType['mbj2025']['venuePage']['cats']
}) {
	return (
		<section className={styles.mapSection}>
			<h2>{cats.title}</h2>
			<div className={styles.content}>
				<div className={styles.mapContainer}>
					<GoogleMaps
						lat={cats.position.lat}
						lng={cats.position.lng}
						markerTitle={cats.markerTitle}
						infoWindowText={cats.infoWindowText}
						mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MBJ_MAP_ID as string}
					/>
				</div>
				<div className={styles.text}>
					<h3>{cats.venueName}</h3>
					{cats.venueDescription.map(line => (
						<p key={line}>{line}</p>
					))}
					<p>{cats.venueAddress}</p>
					<a target="_blank" rel="norefferer" href={cats.venueWebsite}>
						{cats.venueWebsite}
					</a>
				</div>
			</div>
			{/* <div className={styles.cutout}>
				<Image
					priority
					src="/casa-d-italia-cutout.png"
					alt={cats.cutoutAlt}
					width={688}
					height={362}
				/>
			</div> */}
		</section>
	)
}
