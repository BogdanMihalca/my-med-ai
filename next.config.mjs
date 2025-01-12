/** @type {import('next').NextConfig} */

import bundleAnalyzer from "@next/bundle-analyzer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  output: "standalone",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
  },

  webpack: (config) => {
    config.resolve.alias["@huggingface/transformers"] = path.resolve(
      __dirname,
      "node_modules/@huggingface/transformers"
    );
    config.resolve.alias = {
      ...config.resolve.alias,
      sharp$: false,
      "onnxruntime-node$": false,
    };
    return config;
  },
};

export default withBundleAnalyzer(nextConfig);
