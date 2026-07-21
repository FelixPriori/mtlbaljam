import type { Decorator, Preview } from '@storybook/nextjs-vite'
import { Caveat_Brush, Josefin_Sans } from 'next/font/google'
import '../src/app/[lang]/globals.css'

// Mirrors src/app/layout.tsx: the app applies these as classNames on <html>,
// which Storybook never renders, so the --font-* custom properties globals.css
// relies on are otherwise never defined. Reapply them here via a decorator.
const caveatBrush = Caveat_Brush({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal'],
  variable: '--font-caveat-brush',
})

const josephinSans = Josefin_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-josephin-sans',
})

const withFonts: Decorator = Story => (
  <div className={`${caveatBrush.variable} ${josephinSans.variable}`}>
    <Story />
  </div>
)

const preview: Preview = {
  decorators: [withFonts],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;