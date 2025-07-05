import { NextConfig } from 'next'

const nextConfig = {
  devIndicators: false,
  output: 'standalone',
  serverExternalPackages: ['socket.io-client'],
} satisfies NextConfig

export default nextConfig
