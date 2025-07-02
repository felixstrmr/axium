import { NextConfig } from 'next'

const nextConfig = {
  devIndicators: false,
  transpilePackages: ['@axium/ui', '@axium/auth'],
} satisfies NextConfig

export default nextConfig
