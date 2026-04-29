/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    turbopack: {
        root: __dirname,
    },
    webpack: (config) => {
        config.experiments = { ...config.experiments, asyncWebAssembly: true, layers: true };
        return config;
    },
};

module.exports = nextConfig;
