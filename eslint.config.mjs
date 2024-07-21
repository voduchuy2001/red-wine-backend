import globals from 'globals'
import pluginJs from '@eslint/js'

export default [
  {
    ignores: ['src/public', 'src/models', 'src/migrations', 'src/seeders']
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        require: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        module: 'readonly',
        __: 'readonly'
      }
    }
  },
  pluginJs.configs.recommended,
  {
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^(next|req|res)$' }],
      'no-undef': 'warn',
      eqeqeq: 'warn',
      'prefer-const': 'warn',
      'no-var': 'warn',
      'eol-last': ['warn', 'always']
    }
  }
]
