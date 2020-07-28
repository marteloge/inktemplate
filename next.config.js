const { nextI18NextRewrites } = require("next-i18next/rewrites");
const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");

let localeSubpaths = {
  no: "no",
};

module.exports = withPlugins([
  [
    optimizedImages,
    {
      /* config for next-optimized-images */
    },
  ],
  {
    publicRuntimeConfig: {
      localeSubpaths,
    },
    experimental: {
      async rewrites() {
        return [...nextI18NextRewrites(localeSubpaths)];
      },
    },
  },
]);
