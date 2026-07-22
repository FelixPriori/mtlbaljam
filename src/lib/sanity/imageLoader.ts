import type { ImageLoaderProps } from 'next/image'

/**
 * Sanity's CDN already resizes/compresses images via the width/quality/format
 * params baked into the URL by `urlFor(...)`. Using Next's default loader would
 * re-run its own resize on top of that already-processed image — this loader
 * just passes the URL through so Next doesn't do redundant work.
 */
export default function sanityImageLoader({ src }: ImageLoaderProps) {
	return src
}
