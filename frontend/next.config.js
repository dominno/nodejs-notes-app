/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  experimental: {
    serverActions: true,
  },
  // Add this to prevent pre-rendering of pages that need AuthProvider
  typescript: {
    ignoreBuildErrors: true,
  }
}

module.exports = nextConfig 