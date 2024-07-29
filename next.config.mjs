/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**", // Allow all HTTPS domains. Use specific domains in production.
            },
        ],
    },
};

export default nextConfig;
