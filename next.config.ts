import '@/lib/env'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    nodeMiddleware: true,
  },
}

export default nextConfig
