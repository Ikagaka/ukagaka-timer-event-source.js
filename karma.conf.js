/* eslint no-process-env: 0, no-magic-numbers: 0, max-statements: 0 */
const webpack = require("./webpack.config.test");

module.exports = function(config) {
  config.set({
    mime: {"text/x-typescript": ["ts", "tsx"]}, // fix typescript serving video/mp2t mime type
    frameworks: ["mocha", "detectBrowsers"],
    files: ["test/**/*.ts"],
    preprocessors: {"test/**/*.ts": ["webpack", "sourcemap", "espower"]},
    reporters: ["mocha"],
    webpack,
    detectBrowsers: {
      usePhantomJS: false,
      postDetection(availableBrowsers) {
        const result = availableBrowsers;
        const chromeIndex = availableBrowsers.indexOf("Chrome");
        if (chromeIndex >= 0) {
          result.splice(chromeIndex, 1);
          result.push("ChromeHeadless");
        }
        return result;
      },
    },
  });
};
