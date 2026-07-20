import type { Decorator, Meta, StoryObj } from '@storybook/nextjs-vite'
import Socials from './index'

// Socials renders white icons and is absolutely positioned, so it needs a
// relatively-positioned dark backdrop to be visible - matching the black
// wrapper it sits in on the Music section.
const withDarkContainer: Decorator = Story => (
	<div style={{ position: 'relative', width: 220, height: 120, background: 'var(--mbj-color-black)' }}>
		<Story />
	</div>
)

const meta = {
	title: 'Components/Socials',
	component: Socials,
	parameters: {
		layout: 'fullscreen',
	},
	decorators: [withDarkContainer],
	args: {
		socials: {
			facebook: {
				alt: 'Facebook',
				href: 'https://www.facebook.com/MTLBALJAM',
				logo: '/facebook-white.png',
			},
			instagram: {
				alt: 'Instagram',
				href: 'https://www.instagram.com/MTLBALJAM/',
				logo: '/instagram-white.png',
			},
			email: {
				alt: 'Email',
				href: 'mailto:info@campusbalboa.org',
				logo: '/email-white.png',
			},
		},
	},
} satisfies Meta<typeof Socials>

export default meta
type Story = StoryObj<typeof meta>

export const BottomLeft: Story = {
	args: { position: 'bottomLeft' },
}

export const TopRight: Story = {
	args: { position: 'topRight' },
}
