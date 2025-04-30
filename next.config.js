/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Add webpack configuration to handle caching more reliably
  webpack: (config, { dev }) => {
    if (dev) {
      // Disable caching in development to prevent cache-related issues
      config.cache = false;
    }
    return config;
  },
};

module.exports = nextConfig;