/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL,
    MINCEL_URL: process.env.VERCEL_URL || "https://wekit-bucket.vercel.app",
  },
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true,
          },
        },
      ],
    });

    return config;
  },
  images: {
    domains: ["example.com", "sprint-fe-project.s3.ap-northeast-2.amazonaws.com"],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
