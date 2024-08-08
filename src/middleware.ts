import createMiddleware from 'next-intl/middleware';
import { locales, localePrefix } from './navigation';

export default createMiddleware({
  defaultLocale: 'fr',
  localePrefix,
  locales
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};