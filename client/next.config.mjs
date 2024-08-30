/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["firebasestorage.googleapis.com", "loremflickr.com"],
  },
};

export default nextConfig;
