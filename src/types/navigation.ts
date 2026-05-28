export type NavSubtab = {
	text: string
	href: string
}

export type NavSection = {
	key: string
	title: string
	subtabs: NavSubtab[]
}

export type ArchiveEntry = {
	key: string
	title: string
	href: string
}

export type NavigationConfig = {
	menuTitle: string
	archiveLabel: string
	mainSections: NavSection[]
	archiveEntries: ArchiveEntry[]
}
