import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: '*',
				allow: '/',
				disallow: '/private/',
			},
			{
				userAgent: 'GPTBot',
				disallow: '/',
			},
			{
				userAgent: 'ClaudeBot',
				disallow: '/',
			},
			{
				userAgent: 'PerplexityBot',
				disallow: '/',
			},
			{
				userAgent: 'Google-Extended',
				disallow: '/',
			},
			{
				userAgent: 'Applebot-Extended',
				disallow: '/',
			},
			{
				userAgent: 'CCBot',
				disallow: '/',
			},
			{
				userAgent: 'Bytespider',
				disallow: '/',
			},
		],
		sitemap: 'https://mtlbaljam.org/sitemap.xml',
	}
}
