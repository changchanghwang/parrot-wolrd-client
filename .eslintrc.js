module.exports = {
  extends: ['react-app', 'plugin:import/typescript', 'plugin:prettier/recommended', 'plugin:storybook/recommended'],
  plugins: ['prettier', 'react', '@typescript-eslint'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'react/jsx-key': ['error', { checkFragmentShorthand: true }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'no-nested-ternary': 'error',
    'no-console': 'warn',
  },
};
