'use client'

import Image, { type ImageProps } from 'next/image'
import sanityImageLoader from '@/lib/sanity/imageLoader'

type SanityImageProps = Omit<ImageProps, 'loader'>

/**
 * `next/image` pre-wired with the Sanity CDN pass-through loader.
 * Use for any image whose `src` is built via `urlFor(...)` — never plain `next/image`,
 * since forgetting the loader silently re-triggers Next's own resize on top of
 * Sanity's already-processed image.
 *
 * Needs `'use client'` itself: the `loader` prop must be a plain function used
 * inline within the component that owns the client boundary into `next/image`.
 * When it was passed in as a prop from a Server Component (via an earlier,
 * server-rendered wrapper), React couldn't serialize the function across that
 * boundary — marking this file client-only keeps the loader a local import,
 * never a cross-boundary prop.
 */
export default function SanityImage({ alt, ...props }: SanityImageProps) {
	return <Image alt={alt} {...props} loader={sanityImageLoader} />
}
