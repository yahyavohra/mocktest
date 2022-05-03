/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  eslint: {
    dirs: ['pages', 'utils'],
  },
}

module.exports = nextConfig
