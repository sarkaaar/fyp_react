// module.exports = {
//   env: {
//     browser: true,
//     es2021: true,
//   },
//   extends: [
//     'plugin:react/recommended',
//     'airbnb',
//   ],
//   parser: '@typescript-eslint/parser',
//   parserOptions: {
//     ecmaFeatures: {
//       jsx: true,
//     },
//     ecmaVersion: 'latest',
//     sourceType: 'module',
//   },
//   plugins: [
//     'react',
//     '@typescript-eslint',
//   ],
//   rules: {
//     quotes: ['off', 'double'],
//     'import/extensions': [
//       'error',
//       'ignorePackages',
//       {
//         js: 'never',
//         jsx: 'never',
//         ts: 'never',
//         tsx: 'never',
//       },
//     ],
//     'react/jsx-props-no-spreading': 'off',
//     'react/prop-types': 'off',
//     'react/react-in-jsx-scope': 'off',
//     'jsx-a11y/label-has-associated-control': ['error', {
//       required: {
//         some: ['nesting', 'id'],
//       },
//     }],
//     'jsx-a11y/label-has-for': ['error', {
//       required: {
//         some: ['nesting', 'id'],
//       },
//     }],
//     'react/jsx-max-props-per-line': [1, { maximum: 5, when: 'multiline' }],
//     'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
//     'react/function-component-definition': [1, {
//       namedComponents: 'function-declaration',
//       unnamedComponents: 'function-expression',
//     }],
//     'max-len': 'off',
//     'react/require-default-props': 'off',
//     'no-restricted-syntax': 0,
//     'no-unused-vars': 'off',
//     '@typescript-eslint/no-unused-vars': 'error',
//     'no-shadow': 'off',
//     '@typescript-eslint/no-shadow': 'error',
//   },
//   settings: {
//     'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
//     'import/parsers': {
//       '@typescript-eslint/parser': ['.ts', '.tsx'],
//     },
//     'import/resolver': {
//       node: {
//         extensions: ['.js', '.jsx', '.ts', '.tsx'],
//       },
//     },
//   },
// };
