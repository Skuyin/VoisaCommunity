/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DISCORD_WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL,
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
  },
};
console.log('Environment Variables in next.config.mjs:', process.env);
export default nextConfig;
