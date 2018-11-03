module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "semi": [
      "error",
      "always"
    ],
    "no-extra-semi": 0,
    "no-trailing-spaces": 0,
    "comma-dangle": [
      "error",
      "always-multiline"
    ],
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
