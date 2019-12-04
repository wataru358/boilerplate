// prettier.config.js or .prettierrc.js
module.exports = {
  trailingComma: "es6",
  tabWidth: 2,
  semi: false,
  singleQuote: false,
  parser: "typescript",
  trailingComma: "all",
  overrides: [
    {
      files: "*.js",
      options: {
        parser: "babel",
      },
    },
    {
      files: ["*.scss", "*.css"],
      options: {
        parser: "scss",
      },
    },
    {
      files: ["*.json"],
      options: {
        parser: "scss",
      },
    },
  ],
};
