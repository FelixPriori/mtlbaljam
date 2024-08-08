'use client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import styles from './styles.module.scss'
import ExternalLink from '@/assets/svgs/external-link'

interface SpotCollection {
	[key: string]: string[]
}

interface TravelBlogCollection {
	[key: string]: SpotCollection
}

const travelBlogCollection: TravelBlogCollection = {
	foodAndDrinks: {
		breakfast: ['bernie', 'pain', 'kem', 'regine', 'stViateur', 'fairmount'],
		lunchAndDinner: [
			'darna',
			'drogheria',
			'alep',
			'tonki',
			'hung',
			'poutineville',
			'schwartz',
			'ssam',
			'umami',
		],
		drinks: ['birra', 'harricana', 'ernest', 'nestor', 'vices', 'vin'],
	},
	sightSeeing: {
		spots: [
			'botanical',
			'chinatown',
			'fineArts',
			'marche',
			'kondiaronk',
			'laFontaine',
			'spectactles',
			'oratory',
			'stLaurent',
		],
	},
}

function BlogSpot({
	section,
	subSection,
	item,
}: {
	section: string
	subSection: string
	item: string
}) {
	const tItem = useTranslations(
		`MtlBalJam.visitingPage.travelBlogSection.${section}.${subSection}.${item}`,
	)
	const tLegend = useTranslations(
		'MtlBalJam.visitingPage.travelBlogSection.legend',
	)
	const spec = tItem(`specifications`) !== 'none' && tItem(`specifications`)
	const price = tItem(`price`) !== 'none' && tItem(`price`)

	return (
		<p className={styles.blogSpot}>
			<span className={styles.spotName}>{tItem(`name`)}</span>
			<span> - </span>
			<span className={styles.spotType}>{tItem(`type`)}</span>
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
						<abbr title={`${tLegend('veg')}\n${tLegend('gluten')} `}>
							{spec}
						</abbr>
					</span>
					<span> | </span>
				</>
			)}
			<span className={styles.spotNeighborhood}>{tItem(`neighborhood`)}</span>
		</p>
	)
}

function BlogSubSection({
	section,
	subSection,
	subSectionItems,
}: {
	section: string
	subSection: string
	subSectionItems: string[]
}) {
	const t = useTranslations(
		`MtlBalJam.visitingPage.travelBlogSection.${section}.${subSection}`,
	)
	return (
		<div className={styles.blogSubSection}>
			<h3>
				<strong>{t('title')}</strong>
			</h3>
			<ul>
				{subSectionItems.map(item => {
					return (
						<li key={item}>
							<BlogSpot section={section} subSection={subSection} item={item} />
						</li>
					)
				})}
			</ul>
		</div>
	)
}

function BlogSection({
	section,
	sectionItems,
}: {
	section: string
	sectionItems: string[]
}) {
	const t = useTranslations(
		`MtlBalJam.visitingPage.travelBlogSection.${section}`,
	)
	const blog = useTranslations(`MtlBalJam.visitingPage.travelBlogSection`)
	return (
		<div className={styles.blogSection}>
			<div className={styles.image}>
				<Image src={t('image')} alt={t('imageAlt')} width={250} height={250} />
			</div>
			<div className={styles.blogDetails}>
				<div className={styles.buttonContainer}>
					<a
						className={styles.button}
						href={blog('mapUrl')}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={blog('mapAriaLabel')}
					>
						{blog('mapLabel')}
						<ExternalLink />
					</a>
				</div>
				{section === 'foodAndDrinks' && (
					<div className={styles.legend}>
						<p>{blog('legend.veg')}</p>
						<p>{blog('legend.gluten')}</p>
					</div>
				)}
				<p className={styles.sectionIntro}>{t('intro')}</p>
				{sectionItems.map(item => (
					<BlogSubSection
						key={item}
						section={section}
						subSection={item}
						subSectionItems={travelBlogCollection[section][item]}
					/>
				))}
			</div>
		</div>
	)
}

export default function TravelBlog() {
	const t = useTranslations('MtlBalJam.visitingPage.travelBlogSection')
	return (
		<section className={styles.travelBlogSection}>
			<div className={styles.content}>
				<div className={styles.blogCollection}>
					{Object.keys(travelBlogCollection).map(key => (
						<BlogSection
							key={key}
							section={key}
							sectionItems={Object.keys(travelBlogCollection[key])}
						/>
					))}
				</div>
			</div>
		</section>
	)
}
