const nextConfig = {
  experimental: {
    serverActions: {},
    optimizePackageImports: ["@chakra-ui/react"],
  },
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
};

export default nextConfig;
