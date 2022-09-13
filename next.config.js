/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [
            'uploadstatic-sea.mihoyo.com',
            'uploadstatic-sea.hoyoverse.com',
            'webstatic-sea.hoyoverse.com',
            'webstatic.hoyoverse.com',
        ],
    },
    i18n: {
        locales: ['en', 'chs', 'cht', 'fr', 'de', 'id', 'ja', 'ko', 'pt', 'ru', 'es', 'th', 'vi'],
        defaultLocale: 'vi',
        localeDetection: false,
    },
};

module.exports = nextConfig;
