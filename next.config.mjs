// next.config.mjs

const nextConfig = {
  images: {
    // You can configure remote patterns if you want to allow images from specific hosts
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com", // For the placeholder images
        pathname: "/**",
      },
      // Add any other hosts you need in the future
    ],
  },
};

export default nextConfig;
