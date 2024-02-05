module.exports = {
  root: true,
  extends: [
    'prettier',
    'plugin:prettier/recommended',
  ],
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
};
