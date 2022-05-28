
const optimizedImages = require('next-optimized-images');
const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")(["@transitionpt/translations", "@transitionpt/geolocation", "@transitionpt/components"], { setExternals: true });

module.exports = withPlugins([optimizedImages, withTM], {
    basePath: '/admin',
    reactStrictMode: true,
  }
)