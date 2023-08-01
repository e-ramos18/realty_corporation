/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "source.unsplash.com",
      },
      {
        hostname: "images.pexels.com",
      },
    ],
  },
};

module.exports = nextConfig;
