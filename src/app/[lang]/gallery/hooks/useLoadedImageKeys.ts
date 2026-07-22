'use client'

import { useState } from 'react'

/** Tracks which image keys have finished loading, so callers can show a skeleton until then. */
export function useLoadedImageKeys() {
	const [loadedKeys, setLoadedKeys] = useState<Set<string>>(new Set())

	const markLoaded = (key: string) => {
		setLoadedKeys(prev => (prev.has(key) ? prev : new Set(prev).add(key)))
	}

	return { isLoaded: (key: string) => loadedKeys.has(key), markLoaded }
}
