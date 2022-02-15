module.exports = {
  extends: '@mate-academy/eslint-config',
  rules: {
    'max-len': ["error", 160]
  },
  env: {
    jest: true
  },
  rules: {
    'no-proto': 0
  },
  plugins: ['jest']
};
