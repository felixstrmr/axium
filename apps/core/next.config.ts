import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  devIndicators: false,
  output: 'standalone',
  transpilePackages: ['@axium/ui', '@t3-oss/env-nextjs', '@t3-oss/env-core'],

  experimental: {
    browserDebugInfoInTerminal: true,
  },
}

export default nextConfig
