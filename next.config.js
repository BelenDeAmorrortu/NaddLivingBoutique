/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  staticPageGenerationTimeout: 120,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
