module.exports = {
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'no-console': 'off',
    'func-names': 'off',
    'no-underscore-dangle': 'off',
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
};
