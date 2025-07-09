import type { NextConfig } from 'next'

import '@/lib/env'

const nextConfig: NextConfig = {
  devIndicators: false,
  transpilePackages: ['@axium/ui'],
  experimental: {
    nodeMiddleware: true,
  },
}

export default nextConfig
