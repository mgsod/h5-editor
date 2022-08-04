module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    'stylelint-config-prettier',
    'stylelint-config-recommended-vue',
  ],
  rules: {
    'declaration-colon-space-after': 'always-single-line',
    'declaration-colon-space-before': 'never',
    'font-family-no-missing-generic-family-keyword': null,
    'font-family-name-quotes': null,
    'no-invalid-double-slash-comments': null, // 允许使用双斜杠注释
    'at-rule-no-unknown': null, // 允许自定义less变量
    'color-function-notation': null,
    'selector-class-pattern': null,
    'no-descending-specificity': null,
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested'],
      },
    ],
    'value-no-vendor-prefix': [
      true,
      {
        ignoreValues: ['box'],
      },
    ],
  },
};
