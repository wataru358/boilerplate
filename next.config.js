const withPlugins = require("next-compose-plugins");
const images = require("next-images");
const path = require("path");
const css = require("@zeit/next-css");
const sass = require("@zeit/next-sass");
const sourcemaps = require("@zeit/next-source-maps")();
const withTM = require("next-transpile-modules");

const {
  publicBuildtimeConfig,
  publicRuntimeConfig,
} = require("./src/config/application");

const nextConfig = {
  assetPrefix: process.env.ASSET_URL || "",
  // `env` allows using environment variables specified at buildtime
  // https://github.com/zeit/next.js#build-time-configuration
  env: publicBuildtimeConfig,
  // `publicRuntimeConfig` allows using environment variables specified at runtime
  // https://github.com/zeit/next.js#runtime-configuration
  publicRuntimeConfig,
  webpack: config => {
    // handle font files
    // https://github.com/zeit/next-plugins/issues/273#issuecomment-430597241
    //  (images are handled by the `next.images` plugin; sass is handled by next-sass)
    config.module.rules.push({
      test: /\.(otf|eot|ttf|woff|woff2)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 100000,
          name: "[name]-[hash].[ext]",
        },
      },
    });
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          root: path.resolve(__dirname),
          src: path.resolve(__dirname, "src"),
          config: path.resolve(__dirname, "src/config"),
          shared: path.resolve(__dirname, "src/shared"),
          // apps
          admin: path.resolve(__dirname, "src/apps/admin"),
          atlas: path.resolve(__dirname, "src/apps/atlas"),
          books: path.resolve(__dirname, "src/apps/books"),
          internal: path.resolve(__dirname, "src/apps/internal"),
          main: path.resolve(__dirname, "src/apps/main"),
          mappings: path.resolve(__dirname, "src/apps/mappings"),
          portfolio: path.resolve(__dirname, "src/apps/portfolio"),
          vdm: path.resolve(__dirname, "src/apps/vdm"),
        },
      },
    };
  },
};

module.exports = withPlugins(
  [
    [
      withTM,
      {
        transpileModules: ["marine-layer"],
      },
    ],
    [css],
    [sass],
    [images],
    [sourcemaps],
    [
      {
        analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
        analyzeBrowser: ["browser", "both"].includes(
          process.env.BUNDLE_ANALYZE,
        ),
        bundleAnalyzerConfig: {
          server: {
            analyzerMode: "static",
            reportFilename: "../bundles/server.html",
          },
          browser: {
            analyzerMode: "static",
            reportFilename: "./bundles/client.html",
          },
        },
      },
    ],
  ],
  nextConfig,
);
