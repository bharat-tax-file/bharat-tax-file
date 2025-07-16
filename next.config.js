/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ['react-hotjar'],
}

module.exports = nextConfig
// This Next.js configuration file sets React's strict mode to false and specifies that the 'react-hotjar' package should be transpiled, which is useful for integrating Hotjar analytics in a Next.js application.