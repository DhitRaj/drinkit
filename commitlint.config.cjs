/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        'customer',
        'delivery',
        'store',
        'admin',
        'backend',
        'ui',
        'design-system',
        'types',
        'api',
        'utils',
        'config',
        'infra',
        'docs',
        'repo',
      ],
    ],
  },
};
