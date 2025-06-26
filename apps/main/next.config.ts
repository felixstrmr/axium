/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  transpilePackages: ['@axium/ui', '@axium/auth'],
  output: 'standalone',
}

export default nextConfig
