import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  devIndicators: false,
  basePath: process.env.BASEPATH,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
        locale: false
      }
    ]
  }
}

export default nextConfig
