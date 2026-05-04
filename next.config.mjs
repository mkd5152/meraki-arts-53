/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [62, 75]
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.merakiarts53.com"
          }
        ],
        destination: "https://merakiarts53.com/:path*",
        permanent: true
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "merakiarts53.vercel.app"
          }
        ],
        destination: "https://merakiarts53.com/:path*",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
