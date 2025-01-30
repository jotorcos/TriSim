import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // i18n: {
  //   locales: ['es'],
  //   defaultLocale: 'es',
  // },
  output: 'export', // <=== enables static exports
  reactStrictMode: true,
};

export default nextConfig;
