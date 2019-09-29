const nextTypescript = require('@zeit/next-typescript');
const nextOptimizedImages = require("next-optimized-images");
const withPlugins = require("next-compose-plugins");
const withCSS = require('@zeit/next-css')

const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');

dotenvLoad();

const withNextEnv = nextEnv({
  staticPrefix: 'CUSTOM_STATIC_',
  publicPrefix: 'CUSTOM_PUBLIC_',
});

const nextConfig = {
  exportPathMap: function () {
    return {
      '/': { page: '/' },
      '/clients': { page: '/clients' },
      '/brand-setup': { page: '/brandSetup' },
      '/brand-console': { page: '/brandConsole' },
      '/brand-gravity': { page: '/brandGravity' },
      '/website': { page: '/website' },
      '/email': { page: '/email' },
      '/media': { page: '/media' },
      '/social': { page: '/social' },
      '/search': { page: '/search' },
    }
  }
};

module.exports = withPlugins(
  [
    nextEnv({
      staticPrefix: '10THMAN_STATIC_',
      publicPrefix: '10THMAN_PUBLIC_',
    }),
    [nextTypescript], 
    [nextOptimizedImages],
    [withCSS],
  ], nextConfig
);