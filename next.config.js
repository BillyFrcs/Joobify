/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
        JoobifyEndpoint: process.env.JOOBIFY_ENDPOINT,

        ApiKey: process.env.API_KEY,
        AuthDomain: process.env.AUTH_DOMAIN,
        DatabaseURL: process.env.DATABASE_URL,
        ProjectID: process.env.PROJECT_ID,
        StorageBucket: process.env.STORAGE_BUCKET,
        MessagingSenderID: process.env.MESSAGING_SENDER_ID,
        AppID: process.env.APP_ID,
        MeasurementID: process.env.MEASUREMENT_ID
    }

    /*
    async rewrites() {
        return [
            {
                source: "/auth/resetPassword",
                destination: `${process.env.JOOBIFY_ENDPOINT}/auth/resetPassword`
            }
        ];
    }
    */
}

module.exports = nextConfig
