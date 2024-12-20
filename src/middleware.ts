import { NextRequest } from 'next/server'
import { localizationMiddleware } from './localization-middleware'

export function middleware(request: NextRequest) {
	return localizationMiddleware(request)
}

export const config = {
	matcher: ['/((?!api|assets|.*\\..*|_next).*)'],
}
