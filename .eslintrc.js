module.exports = {
  root: true,
  env: { browser: true, node: true, jest: true },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
  },
  globals: { __DEV__: true },
  settings: {
    react: {
      version: "detect",
    },
    "import/extensions": [".js", ".ts", ".tsx", ".jsx"],
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      "babel-module": {},
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  extends: [
    "eslint:recommended",
    "prettier",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint"],
  rules: {
    // Include .prettierrc.js rules
    "prefer-const": 1,
    "react/prop-types": "off",
    "react/display-name": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "jsx-a11y/no-autofocus": "off",
    "react/no-unescaped-entities": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-explicit-any": 1,
    "@typescript-eslint/ban-ts-comment": 1,
    // note you must disable the base rule as it can report incorrect errors
    "lines-between-class-members": "off",
    "@typescript-eslint/lines-between-class-members": ["error"],
    // Prevents eslint to raise an error on interfaces
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warn"],
  },
};
