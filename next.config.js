/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
 devIndicators: false,
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },

  // Configure external image domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'z-cdn.chatglm.cn',
        port: '',
        pathname: '/**',
      },
    ],
    // Allow unoptimized images for development
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

module.exports = nextConfig;
