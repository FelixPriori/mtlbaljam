import Image, { type ImageProps } from 'next/image'
import sanityImageLoader from '@/lib/sanity/imageLoader'

type SanityImageProps = Omit<ImageProps, 'loader'>

/**
 * `next/image` pre-wired with the Sanity CDN pass-through loader.
 * Use for any image whose `src` is built via `urlFor(...)` — never plain `next/image`,
 * since forgetting the loader silently re-triggers Next's own resize on top of
 * Sanity's already-processed image.
 */
export default function SanityImage({ alt, ...props }: SanityImageProps) {
	return <Image alt={alt} {...props} loader={sanityImageLoader} />
}
