/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    turbopack: {
        root: __dirname,
    },
    webpack: (config) => {
        config.experiments = { ...config.experiments, asyncWebAssembly: true, layers: true };
        return config;
    },
};

module.exports = nextConfig;
