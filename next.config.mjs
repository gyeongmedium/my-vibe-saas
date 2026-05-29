/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options',       value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy',        value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',     value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            // 인라인 style prop이 많으므로 'unsafe-inline' 필요
            value: "default-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self'; script-src 'self' 'unsafe-inline'",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
