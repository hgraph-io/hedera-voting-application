const withFonts = require('next-fonts');
const withTM = require('next-transpile-modules')(['hashconnect']);

module.exports = withFonts(
  withTM({
    reactStrictMode: true,
    webpack(config, options) {
      return config;
    }
  })
);
