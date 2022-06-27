module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'import/prefer-default-export': 'off',
    'linebreak-style': 'off',
    'comma-dangle': 'off',
    'no-param-reassign': 'off',
    'arrow-body-style': 'off',
    'template-curly-spacing': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'max-len': 'off',
    'vue/no-mutating-props': 'off',
    'no-plusplus': 'off',
    'padded-blocks': 'off',
    '@typescript-eslint/camelcase': 'off',
    'camelcase': 'off',
    'quote-props': 'off',
  },

  ignorePatterns: ['**/build/*']
}
