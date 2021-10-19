module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['react-hooks'],
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'jsx-quotes': ['error', 'prefer-single'],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: 'useRecoilCallback'
      }
    ],
    'comma-dangle': 'off',
    'react-native/no-inline-styles': 'off',
    'no-bitwise': 'off',
    'no-shadow': 'off',
    curly: 'off'
  }
};
