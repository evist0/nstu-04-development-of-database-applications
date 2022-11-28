module.exports = {
  root: true,
  ignorePatterns: ['*.css', '*.html'],
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime'
  ],
  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
      meteor: true
    },
    react: {
      version: 'detect',
      componentWrapperFunctions: ['styled'],
      linkComponents: [{ name: 'Link', linkAttribute: 'to' }]
    }
  },
  rules: {
    'no-console': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    'import/no-named-as-default-member': 'error',
    'import/no-default-export': 'error',
    'import/no-named-default': 'error',
    'import/no-duplicates': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before'
          }
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ]
  },
  overrides: [
    {
      files: ['client/pages/**/*.tsx'],
      rules: {
        'import/no-default-export': 'off',
        'import/prefer-default-export': 'error'
      }
    }
  ]
}
