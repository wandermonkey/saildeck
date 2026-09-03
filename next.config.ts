import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Preview imagery is served from Unsplash. When you upload Saildeck's own
    // photography to /public/images, swap the `image` fields in src/data/*.ts
    // to local paths and this remotePatterns block can be deleted.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    formats: ["image/avif", "image/webp"],
    // Every `quality` value used anywhere in the app must be listed here —
    // Next.js 16 makes this mandatory and silently ignores unlisted values.
    qualities: [72, 75, 80],
  },
  poweredByHeader: false,
  compress: true,
  async redirects() {
    return [
      // Management moved from under /about to the top level when it was
      // promoted into the main menu. Permanent redirects so the old URLs keep
      // whatever authority they had picked up.
      {
        source: "/about/management",
        destination: "/management",
        permanent: true,
      },
      {
        source: "/about/management/:slug",
        destination: "/management/:slug",
        permanent: true,
      },
      // The placeholder flagship was replaced by the real Princess 61 listing.
      {
        source: "/fleet/celestial-wave",
        destination: "/fleet/princess-61-luxury-motor-yacht-mumbai",
        permanent: true,
      },
      // Elysian Tide was renamed to Tara Sailing Catamaran Mumbai.
      {
        source: "/fleet/elysian-tide",
        destination: "/fleet/tara-sailing-catamaran-mumbai",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
