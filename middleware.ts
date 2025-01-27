import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

const DEFAULT_LOCALE = 'en';
const LOCALES = ['en', 'es'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip public files or API routes
  if (PUBLIC_FILE.test(pathname) || pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Check if the pathname already includes a valid locale
  const pathnameParts = pathname.split('/');
  const locale = pathnameParts[1];

  if (LOCALES.includes(locale)) {
    return NextResponse.next();
  }

  // Detect the user's preferred locale
  const userLocale =
    request.headers.get('accept-language')?.split(',')[0]?.slice(0, 2) ||
    DEFAULT_LOCALE;
  const preferredLocale = LOCALES.includes(userLocale)
    ? userLocale
    : DEFAULT_LOCALE;

  // Rewrite the URL to include the locale
  return NextResponse.redirect(
    new URL(`/${preferredLocale}${pathname}`, request.url)
  );
}
