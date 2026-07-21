import type { Decorator, Meta, StoryObj } from '@storybook/nextjs-vite'
import { userEvent } from 'storybook/test'
import Navigation from './index'
import navigationStyles from './styles.module.scss'
import mobileNavStyles from '../MobileNavigation/styles.module.scss'
import type { NavigationConfig } from '@/types/navigation'

const config: NavigationConfig = {
	menuTitle: 'Menu',
	archiveLabel: 'Archive',
	mainSections: [
		{
			key: 'about',
			title: 'About',
			subtabs: [
				{ text: 'Team and vision', href: '/en/about' },
				{ text: 'Code of conduct', href: '/en/code-of-conduct' },
				{ text: 'Volunteering', href: '/en/volunteering' },
			],
		},
		{
			key: 'mbj2026',
			title: 'MTL BAL JAM 2026',
			subtabs: [
				{ text: 'Instructors', href: '/en/2026/instructors' },
				{ text: 'Registration', href: '/en/2026/registration' },
				{ text: 'Workshops', href: '/en/2026/tracks' },
				{ text: 'Venue', href: '/en/2026/venue' },
				{ text: 'Music', href: '/en/2026/music' },
				{ text: 'Competitions', href: '/en/2026/competitions' },
				{ text: 'Schedule', href: '/en/2026/schedule' },
				{ text: 'Extra', href: '/en/2026/extra' },
			],
		},
		{
			key: 'travel',
			title: 'Travel',
			subtabs: [
				{ text: 'Visiting Montréal / Tiohtià:ke', href: '/en/visiting' },
				{ text: 'Travel info', href: '/en/travel' },
			],
		},
	],
	archiveEntries: [
		{ key: 'mbj2024', title: 'MTL BAL JAM 2024', href: '/en/2024' },
		{ key: 'mbj2025', title: 'MTL BAL JAM 2025', href: '/en/2025' },
	],
}

const meta = {
	title: 'Components/Navigation',
	component: Navigation,
	parameters: {
		layout: 'fullscreen',
		nextjs: {
			appDirectory: true,
			navigation: { pathname: '/en/2026/competitions' },
		},
	},
	args: {
		config,
		lang: 'en',
	},
} satisfies Meta<typeof Navigation>

export default meta
type Story = StoryObj<typeof meta>

// Desktop: the dropdown-style NavLinks menu, visible above 768px.
export const Desktop: Story = {}

// Mobile: MobileNavigation's fullscreen overlay, visible at/below 768px.
// The Storybook canvas is normally wider than that breakpoint, so this
// forces the mobile variant on and the desktop one off to preview it.
const ForceMobileVariant: Decorator = Story => (
	<>
		<style>{`
			.${navigationStyles.navigation} {
				display: none !important;
			}
			.${mobileNavStyles.mbjButtonContainer}, .${mobileNavStyles.mbjOverlay} {
				display: block !important;
			}
		`}</style>
		<Story />
	</>
)

export const Mobile: Story = {
	decorators: [ForceMobileVariant],
	play: async ({ canvasElement }) => {
		const toggle = canvasElement.querySelector<HTMLElement>(`.${mobileNavStyles.mbjButtonContainer}`)
		if (toggle) await userEvent.click(toggle)
	},
}
