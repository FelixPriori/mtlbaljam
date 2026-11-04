export function toPostalAddress(address: string | null | undefined) {
	const [street, city, regionPostal] = (address ?? '').split(', ')
	const spaceIdx = (regionPostal ?? '').indexOf(' ')
	return {
		'@type': 'PostalAddress',
		streetAddress: street || undefined,
		addressLocality: city || 'Montréal',
		addressRegion: (spaceIdx > 0 ? regionPostal?.slice(0, spaceIdx) : regionPostal) || 'QC',
		postalCode: spaceIdx > 0 ? regionPostal?.slice(spaceIdx + 1) : undefined,
		addressCountry: 'CA',
	}
}
