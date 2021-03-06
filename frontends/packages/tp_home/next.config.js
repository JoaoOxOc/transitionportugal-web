module.exports = {
  reactStrictMode: true,
}

const optimizedImages = require('next-optimized-images');
const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")(["@transitionpt/translations"], { setExternals: true });

module.exports = withPlugins([optimizedImages, withTM], {
    reactStrictMode: true,
    images: {
      disableStaticImages: true
    },
    experimental: {
      // Enables the styled-components SWC transform
      styledComponents: true
    }
  }
)