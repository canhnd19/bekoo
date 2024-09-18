/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  overrides: [{
    files: [
      'e2e/**/*.{test,spec}.{js,ts,jsx,tsx}'
    ],
    'extends': [
      'plugin:playwright/recommended'
    ]
  }],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'vue/component-tags-order': [
      'error',
      {
        order: [
          ['template', 'script'], 'style'
        ]
      }
    ],
    'vue/no-multiple-template-root': 'off',
    'vue/no-setup-props-destructure': 'off',
    'no-undef': 'off',
    'no-debugger': 'off',
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "args": "all",
        "argsIgnorePattern": "^_",
        "caughtErrors": "all",
        "caughtErrorsIgnorePattern": "^_",
        "destructuredArrayIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "ignoreRestSiblings": true
      }
    ]
    // 'vue/component-name-in-template-casing': ['error', 'kebab-case']
  },
}