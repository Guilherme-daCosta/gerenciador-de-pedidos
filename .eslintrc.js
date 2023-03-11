module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: 'standard',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    semi: ['error', 'always'],
    'comma-dangle': ['error', 'never'],
    eqeqeq: ['error', 'smart'],
    'space-before-function-paren': ['error', 'never']
  }
};
