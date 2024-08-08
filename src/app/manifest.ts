import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'MTL BAL JAM',
		short_name: 'MTL BAL JAM',
		description: 'A Balboa event based in Montréal/Tiohtià:ke.',
		start_url: '/',
		scope: '/',
		display: 'standalone',
		background_color: '#faf9f6',
		theme_color: '#f4a261',
		icons: [
			{
				src: '/favicon.ico',
				sizes: '32x32',
				type: 'image/x-icon',
			},
			{
				src: '/icon-192x192.png',
				sizes: '192x192',
				type: 'image/png',
			},
			{
				src: '/icon-512x512.png',
				sizes: '512x512',
				type: 'image/png',
			},
		],
	}
}
