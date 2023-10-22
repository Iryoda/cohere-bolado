/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: { domains: ["images.unsplash.com"] },
};

module.exports = nextConfig;
