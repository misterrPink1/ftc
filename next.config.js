/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    esmExternals: 'loose'
  },
  images: {
    domains: [''],
  },
}

module.exports = nextConfig
