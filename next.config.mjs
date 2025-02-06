/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
  async redirects() {
    return [
      {
        source: "/courses",
        destination: "/",
        permanent: true,
      },
    ]
  },
}

let userConfig = undefined
try {
  userConfig = await import("./v0-user-next.config")
} catch (e) {
  // ignore error
}

function mergeConfig(baseConfig, userConfig) {
  if (!userConfig) {
    return baseConfig
  }

  const merged = { ...baseConfig }
  for (const key in userConfig) {
    if (typeof baseConfig[key] === "object" && !Array.isArray(baseConfig[key])) {
      merged[key] = {
        ...baseConfig[key],
        ...userConfig[key],
      }
    } else {
      merged[key] = userConfig[key]
    }
  }
  return merged
}

const finalConfig = mergeConfig(nextConfig, userConfig)

export default finalConfig

