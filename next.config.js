/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  resolve: {
    mainFields: ['browser', 'module', 'main'],
  },
};

module.exports = nextConfig;
