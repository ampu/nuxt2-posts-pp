module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    `@nuxtjs/eslint-config-typescript`,
    `plugin:nuxt/recommended`,
  ],
  plugins: [],
  rules: {
    quotes: [`error`, `backtick`],
    'comma-dangle': [`error`, {
      arrays: `always-multiline`,
      objects: `always-multiline`,
      imports: `always-multiline`,
      exports: `always-multiline`,
      functions: `always-multiline`,
    }],
    'object-curly-spacing': [`error`, `never`],
    'space-before-function-paren': [`error`, `never`],
    'require-await': `off`,
    'import/order': `off`,
    'vue/html-closing-bracket-spacing': `off`,
    'vue/attribute-hyphenation': `off`,
    'arrow-parens': [`error`, `always`],
  },
}
