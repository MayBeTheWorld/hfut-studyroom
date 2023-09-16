module.exports = {
  root: true,
  parserOptions: {
    parser: '@babel/eslint-parser', // 解析器
    sourceType: 'module',
    ecmaVersion: 12
  },
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: [
    'eslint:recommended', // eslint
    'plugin:prettier/recommended', // plugin-prettier
    'taro/nerv'
  ],

  rules: {
    'prettier/prettier': 'error'
  }
}
