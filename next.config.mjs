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

  // Handle domain-specific routing
  async middleware() {
    return {
      source: '/(.*)',
      headers: async ({ headers, url }) => {
        const host = headers.get('host')
        
        // Only allow learn routes on learn subdomain
        if (host === 'test.trailacademy.net' && url.pathname.startsWith('/learn')) {
          return Response.redirect('https://test.trailacademy.net')
        }

        // Serve learn content directly on learn subdomain
        if (host === 'learn.trailacademy.net') {
          return Response.rewrite(new URL('/learn' + url.pathname, url))
        }

        return headers
      },
    }
  },

  // Keep existing rewrites but modify for domain separation
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
        },
      ],
      afterFiles: [
        {
          source: '/:path*',
          destination: '/:path*',
        },
      ],
      fallback: [
        {
          source: '/:path*',
          destination: '/404',
        },
      ],
    }
  },
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