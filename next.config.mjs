/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hide the Next.js "N" dev-mode badge in the corner
  devIndicators: false,
  images: {
    // Google Drive photos are fetched once by our server and cached, instead of each
    // browser hotlinking Google (which Google throttles with 403/429 responses)
    remotePatterns: [new URL('https://lh3.googleusercontent.com/d/**')],
    minimumCacheTTL: 86400,
  },
};

export default nextConfig;
