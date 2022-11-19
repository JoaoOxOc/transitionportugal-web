module.exports = {
  reactStrictMode: true,
}

const optimizedImages = require('next-optimized-images');
const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")(["@transitionpt/translations", "@transitionpt/components"], { setExternals: true });

module.exports = withPlugins([optimizedImages, withTM], {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      disableStaticImages: true
    },
    compiler: {
      // Enables the styled-components SWC transform
      styledComponents: true
    }
  }
)