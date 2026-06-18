/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Optimize for static hosting if you choose to export
  images: {
    formats: ['image/avif', 'image/webp']
  },
  // Three.js / R3F sometimes needs transpilation safeguards
  transpilePackages: ['three']
};

export default nextConfig;
