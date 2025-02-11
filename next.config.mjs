// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output as standalone for better optimization
  output: 'standalone',
  
  // Disable powered by header
  poweredByHeader: false,
  
  // Enable React strict mode
  reactStrictMode: true,

  // Webpack configuration to handle modules correctly
  webpack: (config, { isServer }) => {
    // Fix handling of async chunks
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      }
    }
    return config
  },

  // Handle domain redirects
  async redirects() {
    return [
      {
        source: '/learn/:path*',
        has: [
          {
            type: 'host',
            value: 'trailacademy.net',
          },
        ],
        permanent: true,
        destination: 'https://learn.trailacademy.net/:path*',
      }
    ]
  }
}

export default nextConfig