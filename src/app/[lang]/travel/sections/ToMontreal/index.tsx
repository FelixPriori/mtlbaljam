import styles from './styles.module.scss'
import GoogleMaps from '@/app/[lang]/components/CustomGoogleMap'
import { DictionaryType } from '@/app/[lang]/dictionaries'

type ToMontrealData = DictionaryType['travelPage']['toMontreal']

type TravelMode = keyof Omit<ToMontrealData, 'title'>

const keys: TravelMode[] = ['plane', 'train', 'bus']

export default function ToMontreal({
	toMontreal,
}: {
	toMontreal: ToMontrealData
}) {
	return (
		<section className={styles.toMontrealSection}>
			<h2>{toMontreal.title}</h2>
			<div className={styles.content}>
				{keys.map(key => (
					<div key={key} className={styles.mode}>
						<div className={styles.mapContainer}>
							<GoogleMaps
								lat={toMontreal[key].location.lat}
								lng={toMontreal[key].location.lng}
								markerTitle={toMontreal[key].location.markerTitle}
								infoWindowText={toMontreal[key].location.infoWindowText}
								mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MBJ_MAP_ID as string}
								zoom={key === 'plane' ? 13 : 15}
							/>
						</div>
						<div>
							<h3 className={styles.modeTitle}>{toMontreal[key].title}</h3>
							<p className={styles.modePlace}>{toMontreal[key].place}</p>
							<p className={styles.modeAddress}>{toMontreal[key].address}</p>
							{key === 'plane' &&
								toMontreal[key].details.map(line => <p key={line}>{line}</p>)}
						</div>
					</div>
				))}
			</div>
		</section>
	)
}

/*
// (-0.0005)
// (-0.0026142)
*/
