module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react-hooks"],
  rules: {
    // enabled rules
    "@typescript-eslint/array-type": ["error", "array-simple"],
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", ignoreRestSiblings: true },
    ],
    eqeqeq: ["error", "smart"],
    "no-console": ["error", { allow: ["error", "info", "warn"] }],
    "no-else-return": "error",
    "no-undef-init": "error",
    "no-var": "error",
    "prefer-const": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    // disabled rules
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/prefer-interface": "off",
    "react/display-name": "off",
    // from https://git.corp.tc/Software-Apps/abp-frontend/blob/develop/.eslintrc.js
    "no-restricted-globals": [
      "error", // Note: change to warning if this causes a block
      {
        name: "name",
        message:
          "This is the global name property. You probably do not want to access / use global.name directly",
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
