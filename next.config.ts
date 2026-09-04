import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/services/luxury-influencer-marketing",
        destination: "/services/influencer-marketing",
        permanent: true,
      },
      {
        source: "/services/social-media-strategy",
        destination: "/services/social-media-marketing",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
