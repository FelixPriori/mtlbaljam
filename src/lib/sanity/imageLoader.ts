import type { ImageLoaderProps } from 'next/image'

/**
 * Sanity's CDN resizes/compresses images via the width/height/quality/format
 * params baked into the URL by `urlFor(...)`. Next's default loader would
 * re-run its own resize on top of that already-processed image, so we supply
 * our own — but it still needs to honor the `width` Next computes per
 * responsive breakpoint (from the `sizes` prop + device pixel ratio), or
 * every candidate in the srcset collapses to the same URL. This substitutes
 * Next's requested width into the existing Sanity URL, scaling height
 * proportionally if one was set, while leaving quality/format untouched.
 */
export default function sanityImageLoader({ src, width }: ImageLoaderProps) {
	const url = new URL(src)
	const originalWidth = Number(url.searchParams.get('w')) || width
	const originalHeight = Number(url.searchParams.get('h'))

	url.searchParams.set('w', String(width))
	if (originalHeight) {
		url.searchParams.set('h', String(Math.round((originalHeight / originalWidth) * width)))
	}

	return url.toString()
}
