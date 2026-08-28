/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: 'https://study-server-eight.vercel.app/:path*', 
      },
    ];
  },
};

export default nextConfig;