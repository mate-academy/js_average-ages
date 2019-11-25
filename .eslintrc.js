module.exports = {
  extends: '@mate-academy/eslint-config',
  rules: {
    'max-len': ["error", 160]
  },
  env: {
    jest: true
  },
  plugins: ['jest']
};
