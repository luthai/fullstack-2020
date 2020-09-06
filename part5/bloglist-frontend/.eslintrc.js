module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
    browser: true,
    "jest/globals": true,
  },
  extends: 'airbnb',
  rules: {
    'linebreak-style': ['error', 'windows'],
    'react/jsx-one-expression-per-line': 'off',
  },
  parser: "babel-eslint",
};
