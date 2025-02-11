let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },

  // Optimize output
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,

  // Domain and route handling
  async redirects() {
    return [
      // Redirect any attempts to access /learn on main domains to learn subdomain
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
      },
      {
        source: '/learn/:path*',
        has: [
          {
            type: 'host',
            value: 'test.trailacademy.net',
          },
        ],
        permanent: false,
        destination: 'https://learn.trailacademy.net/:path*',
      }
    ]
  },

  // Handle domain-specific content
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'learn.trailacademy.net',
            },
          ],
          destination: '/learn/:path*',
        }
      ],
      afterFiles: [
        {
          source: '/:path*',
          destination: '/:path*',
        }
      ],
      fallback: [
        {
          source: '/:path*',
          destination: '/404',
        }
      ]
    }
  }
}

mergeConfig(nextConfig, userConfig)

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return
  }

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      }
    } else {
      nextConfig[key] = userConfig[key]
    }
  }
}

export default nextConfig