/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      's3.ap-southeast-1.amazonaws.com',
      'cdn.10minuteschool.com'
    ],
  },
};

module.exports = nextConfig;
