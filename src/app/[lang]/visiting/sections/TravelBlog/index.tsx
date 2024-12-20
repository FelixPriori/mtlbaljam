import Image from 'next/image'
import styles from './styles.module.scss'
import ExternalLink from '@/assets/svgs/external-link'
import { DictionaryType } from '@/app/[lang]/dictionaries'

type TravelBlogSection = DictionaryType['visitingPage']['travelBlogSection']

type SectionNames = 'foodAndDrinks' | 'sightSeeing'

type TravelBlogSections = TravelBlogSection['sections'][SectionNames]

type TravelBlogSubSection = TravelBlogSections['subSections'][number]

type TravelBlogSpots =
	TravelBlogSections['subSections'][number]['spots'][number]

type Legend = DictionaryType['visitingPage']['travelBlogSection']['legend']

function BlogSpot({ spot, legend }: { legend: Legend; spot: TravelBlogSpots }) {
	const spec = spot.specifications !== 'none' && spot.specifications
	const price = spot.price !== 'none' && spot.price

	return (
		<p className={styles.blogSpot}>
			<span className={styles.spotName}>{spot.name}</span>
			<span> - </span>
			<span className={styles.spotType}>{spot.type}</span>
			<span> | </span>
			{price && (
				<>
					<span className={styles.spotPrice}>{price}</span>
					<span> | </span>
				</>
			)}
			{spec && (
				<>
					<span className={styles.spotSpec}>
						<abbr title={`${legend.veg}\n${legend.gluten} `}>{spec}</abbr>
					</span>
					<span> | </span>
				</>
			)}
			<span className={styles.spotNeighborhood}>{spot.neighborhood}</span>
		</p>
	)
}

function BlogSubSection({
	subSection,
	legend,
}: {
	legend: Legend
	subSection: TravelBlogSubSection
}) {
	return (
		<div className={styles.blogSubSection}>
			<h3>
				<strong>{subSection.title}</strong>
			</h3>
			<ul>
				{subSection.spots.map(spot => (
					<li key={spot.name}>
						<BlogSpot spot={spot} legend={legend} />
					</li>
				))}
			</ul>
		</div>
	)
}

function BlogSection({
	sectionName,
	travelBlog,
	section,
}: {
	sectionName: SectionNames
	travelBlog: TravelBlogSection
	section: TravelBlogSections
}) {
	return (
		<div className={styles.blogSection}>
			<div className={styles.image}>
				<Image
					src={section.image}
					alt={section.imageAlt}
					width={1080}
					height={1080}
				/>
			</div>
			<div className={styles.blogDetails}>
				<div className={styles.buttonContainer}>
					<a
						className={styles.button}
						href={travelBlog.mapUrl}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={travelBlog.mapAriaLabel}
					>
						{travelBlog.mapLabel}
						<ExternalLink />
					</a>
				</div>
				{sectionName === 'foodAndDrinks' && (
					<div className={styles.legend}>
						<p>{travelBlog.legend.veg}</p>
						<p>{travelBlog.legend.gluten}</p>
					</div>
				)}
				<p className={styles.sectionIntro}>{section.intro}</p>
				{section.subSections.map(subSection => (
					<BlogSubSection
						legend={travelBlog.legend}
						key={subSection.title}
						subSection={subSection}
					/>
				))}
			</div>
		</div>
	)
}

export default function TravelBlog({
	travelBlogSection,
}: {
	travelBlogSection: DictionaryType['visitingPage']['travelBlogSection']
}) {
	return (
		<section className={styles.travelBlogSection}>
			<div className={styles.content}>
				<div className={styles.blogCollection}>
					<BlogSection
						sectionName="foodAndDrinks"
						section={travelBlogSection.sections.foodAndDrinks}
						travelBlog={travelBlogSection}
					/>
					<BlogSection
						sectionName="sightSeeing"
						section={travelBlogSection.sections.sightSeeing}
						travelBlog={travelBlogSection}
					/>
				</div>
			</div>
		</section>
	)
}
