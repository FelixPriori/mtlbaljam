import type {Decorator, Meta, StoryObj} from '@storybook/nextjs-vite'
import FeatureCard from './index'

// FeatureCard is always placed on the teal section background (Staff, DJs,
// Judges) - never on the default white canvas.
const withTealBackground: Decorator = (Story) => (
  <div style={{background: 'var(--mbj-color-teal)', padding: '2rem'}}>
    <Story />
  </div>
)

const meta = {
  title: 'Components/FeatureCard',
  component: FeatureCard,
  parameters: {
    layout: 'centered',
  },
  decorators: [withTealBackground],
  argTypes: {
    isH4: {control: 'boolean'},
  },
} satisfies Meta<typeof FeatureCard>

export default meta
type Story = StoryObj<typeof meta>

// As used in the Staff section, with role/pronouns rendered as children.
export const StaffMember: Story = {
  args: {
    name: 'Tania',
    image: {src: '/placeholder-avatar.jpg', alt: 'Tania'},
    isH4: true,
    children: (
      <>
        <p>She/her</p>
        <p>Organizer</p>
      </>
    ),
  },
}

// As used in the Judges/DJs sections, without children.
export const WithoutChildren: Story = {
  args: {
    name: 'Tania',
    image: {src: '/placeholder-avatar.jpg', alt: 'Tania'},
    isH4: false,
  },
}
