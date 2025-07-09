import type { NextConfig } from 'next'

import '@/src/lib/env'

const nextConfig: NextConfig = {
  devIndicators: false,
  transpilePackages: ['@axium/ui'],
  experimental: {
    nodeMiddleware: true,
  },
  output: 'standalone',
}

export default nextConfig
