module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "standard", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
    // "no-console": "error",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "no-new": 0,
    camelcase: 0,
    "react/display-name": 0,
    "react/prop-types": 0,
    "jsx-a11y/anchor-has-content": "off",
    "no-import-assign": 0,
  },
};
