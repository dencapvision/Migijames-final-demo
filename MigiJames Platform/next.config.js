/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages deployment
  output: 'standalone',
  
  images: {
    // Cloudflare R2 public bucket URL
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'pub-*.r2.dev',
      },
    ],
  },
  
  // Thai language support
  i18n: {
    locales: ['th'],
    defaultLocale: 'th',
  },
}

module.exports = nextConfig
