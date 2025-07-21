import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  devIndicators: false,
  output: 'standalone',
  transpilePackages: ['@axium/ui'],

  experimental: {
    browserDebugInfoInTerminal: true,
  },
}

export default nextConfig
