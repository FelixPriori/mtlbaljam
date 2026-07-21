import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import PillRadio from './index'

const meta = {
	title: 'Components/PillRadio',
	component: PillRadio,
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof PillRadio>

export default meta
type Story = StoryObj<typeof meta>

// As used by LanguageSwitcher.
export const LanguageSwitch: Story = {
	args: {
		options: [
			{ name: 'EN', href: '/en', active: true },
			{ name: 'FR', href: '/fr', active: false },
		],
	},
}

// A three-option variant to show the first/last pill rounding.
export const ThreeOptions: Story = {
	args: {
		options: [
			{ name: 'Music', href: '/music', active: false },
			{ name: 'Schedule', href: '/schedule', active: true },
			{ name: 'Venue', href: '/venue', active: false },
		],
	},
}
