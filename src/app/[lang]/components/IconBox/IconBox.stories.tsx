import type { Decorator, Meta, StoryObj } from '@storybook/nextjs-vite'
import IconBox from './index'

function withRelativeContainer(background: string): Decorator {
	function RelativeContainer(Story: Parameters<Decorator>[0]) {
		return (
			<div style={{ position: 'relative', width: 300, height: 300, background }}>
				<Story />
			</div>
		)
	}
	return RelativeContainer
}

const meta = {
	title: 'Components/IconBox',
	component: IconBox,
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {
		position: {
			control: 'select',
			options: [
				'topLeft',
				'topRight',
				'bottomRight',
				'bottomLeft',
				'centerLeft',
				'centerRight',
			],
		},
	},
} satisfies Meta<typeof IconBox>

export default meta
type Story = StoryObj<typeof meta>

// As used in the Footer and Music sections, on a light background.
export const OnLightBackground: Story = {
	args: {
		src: '/mbj-toaster-black.png',
		alt: 'Toaster icon',
		width: 50,
		height: 50,
		position: 'topRight',
	},
	decorators: [withRelativeContainer('var(--mbj-color-white)')],
}

// As used in the Venue section, where the icon sits on a dark backdrop.
export const OnDarkBackground: Story = {
	args: {
		src: '/mbj-loaf-white.png',
		alt: 'Loaf of bread icon',
		width: 50,
		height: 50,
		position: 'topLeft',
	},
	decorators: [withRelativeContainer('var(--mbj-color-black)')],
}
