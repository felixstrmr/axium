import { NextConfig } from 'next'

const nextConfig = {
  devIndicators: false,
  output: 'standalone',
  serverExternalPackages: ['socket.io-client'],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    return config
  },
} satisfies NextConfig

export default nextConfig
