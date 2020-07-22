const { nextI18NextRewrites } = require("next-i18next/rewrites");

let localeSubpaths = {
  no: "no",
};

module.exports = {
  publicRuntimeConfig: {
    localeSubpaths,
  },
  experimental: {
    async rewrites() {
      return [...nextI18NextRewrites(localeSubpaths)];
    },
  },
};
