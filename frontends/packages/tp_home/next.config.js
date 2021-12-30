module.exports = {
  reactStrictMode: true,
}
const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")(["@transitionpt/generic_header"]);

module.exports = withPlugins([withTM], {
    reactStrictMode: true
  }
)