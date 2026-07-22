'use client'

import { useEffect, useRef, useState } from 'react'

const PAGE_SIZE = 30

/** Reveals items in batches as the user scrolls near the end of the currently-visible set. */
export function useScrollReveal(total: number) {
	const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
	const sentinelRef = useRef<HTMLParagraphElement>(null)

	useEffect(() => {
		if (visibleCount >= total) return
		const node = sentinelRef.current
		if (!node) return

		const observer = new IntersectionObserver(
			entries => {
				if (entries[0].isIntersecting) {
					setVisibleCount(count => Math.min(count + PAGE_SIZE, total))
				}
			},
			{ rootMargin: '600px' },
		)
		observer.observe(node)
		return () => observer.disconnect()
	}, [visibleCount, total])

	const reset = () => setVisibleCount(PAGE_SIZE)

	return { visibleCount, sentinelRef, reset, hasMore: visibleCount < total }
}
