import type { Decorator, Meta, StoryObj } from '@storybook/nextjs-vite'
import NoteBox from './index'

// NoteBox is always placed on the black section background (Competitions
// intro, Extra items) and its white border needs that dark backdrop.
const withDarkBackground: Decorator = Story => (
	<div style={{ background: 'var(--mbj-color-black)', padding: '2rem', maxWidth: 400 }}>
		<Story />
	</div>
)

const meta = {
	title: 'Components/NoteBox',
	component: NoteBox,
	parameters: {
		layout: 'fullscreen',
	},
	decorators: [withDarkBackground],
	argTypes: {
		variant: {
			control: 'select',
			options: ['solid', 'dotted'],
		},
	},
} satisfies Meta<typeof NoteBox>

export default meta
type Story = StoryObj<typeof meta>

// As used in the Competitions intro for the schedule disclaimer note.
export const Solid: Story = {
	args: {
		variant: 'solid',
		children: (
			<p style={{ color: 'var(--mbj-color-white)', textAlign: 'center' }}>
				MTL BAL JAM wants to prioritize social dancing! As such, we will make sure that
				competitions run smoothly and that they do not interfere with the social dance more
				than they have to.
			</p>
		),
	},
}

// As used in the Extra section for order instructions.
export const Dotted: Story = {
	args: {
		variant: 'dotted',
		children: (
			<>
				<h3 style={{ color: 'var(--mbj-color-white)', marginBottom: '0.25rem' }}>
					How to order
				</h3>
				<ul style={{ color: 'var(--mbj-color-white)', marginLeft: '1rem' }}>
					<li>Available for purchase at the front desk</li>
				</ul>
			</>
		),
	},
}
