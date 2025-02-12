export const domains = {
    // Main domain - changes based on environment
    main: process.env.NEXT_PUBLIC_MAIN_DOMAIN || 'trailacademy.net',
    // Learn subdomain
    learn: process.env.NEXT_PUBLIC_LEARN_DOMAIN || 'learn.trailacademy.net',
    // Current environment
    isProduction: process.env.NODE_ENV === 'production'
  }
  
  // Helper to get the correct base domain
  export function getBaseDomain(): string {
    if (domains.isProduction) {
      return 'trailacademy.net'
    }
    return 'test.trailacademy.net'
  }
  
  // Helper to get full URLs
  export function getMainUrl(path: string = ''): string {
    return `https://${getBaseDomain()}${path}`
  }
  
  export function getLearnUrl(path: string = ''): string {
    return `https://${domains.learn}${path}`
  }