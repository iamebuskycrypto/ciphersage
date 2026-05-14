import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable WebAssembly support for fhenixjs (FHE encryption)
  experimental: {
    turbo: {
      rules: {
        '*.wasm': {
          loaders: [],
          as: '*.wasm',
        },
      },
    },
  },
  webpack(config, { isServer }) {
    // Handle WebAssembly modules used by fhenixjs
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    };

    // Prevent server-side bundling of fhenixjs (browser-only)
    if (isServer) {
      config.externals = [
        ...(Array.isArray(config.externals) ? config.externals : []),
        'fhenixjs',
      ];
    }

    return config;
  },
};

export default nextConfig;
