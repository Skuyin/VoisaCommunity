/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DISCORD_WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL,
  },
};

export default nextConfig;
