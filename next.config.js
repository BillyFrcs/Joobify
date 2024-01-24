/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
        joobifyEndpoint: process.env.JOOBIFY_ENDPOINT
    },
    async rewrites() {
        return [
            {
                source: "/auth/resetPassword",
                destination: `${process.env.JOOBIFY_ENDPOINT}/auth/resetPassword`
            }
        ];
    }
}

module.exports = nextConfig
