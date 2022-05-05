module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint'), 'plugin:prettier/recommended'],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    'prettier/prettier': 'error',
    'no-useless-escape': 0,
    'react-hooks/exhaustive-deps': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    '@typescript-eslint/consistent-type-imports': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off'
  }
};
