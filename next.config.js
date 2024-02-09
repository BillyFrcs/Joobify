require("dotenv").config();

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
        JOOBIFY_ENDPOINT: process.env.JOOBIFY_ENDPOINT,
        API_KEY: process.env.API_KEY,
        AUTH_DOMAIN: process.env.AUTH_DOMAIN,
        DATABASE_URL: process.env.DATABASE_URL,
        PROJECT_ID: process.env.PROJECT_ID,
        STORAGE_BUCKET: process.env.STORAGE_BUCKET,
        MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
        APP_ID: process.env.APP_ID,
        MEASUREMENT_ID: process.env.MEASUREMENT_ID
    },
    images: {
        unoptimized: true
    }
}

module.exports = nextConfig
