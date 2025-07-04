import { NextConfig } from 'next'

const nextConfig = {
  devIndicators: false,
  output: 'standalone',
  serverExternalPackages: ['socket.io-client', 'xterm', '@xterm/addon-fit'],
} satisfies NextConfig

export default nextConfig
