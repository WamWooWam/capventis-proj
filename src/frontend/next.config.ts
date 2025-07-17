import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  basePath: '/gallery',
  compiler: {
    relay: {
      src: './',
      artifactDirectory: './src/__generated__',
      language: 'typescript',
      eagerEsModules: false,
    },
  }
};

export default nextConfig;
