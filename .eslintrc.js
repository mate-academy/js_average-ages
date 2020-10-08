module.exports = {
  extends: '@mate-academy/eslint-config',
  env: {
    jest: true
  },
  rules: {
    'max-len': ["error", { "code": 120 }],
    'no-proto': 0
  },
  plugins: ['jest']
};
