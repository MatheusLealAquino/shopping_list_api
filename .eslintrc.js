module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'airbnb-base',
		'plugin:@typescript-eslint/recommended',
	],
	parser: '@typescript-eslint/parser',
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
	},
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: [
		'@typescript-eslint',
	],
	rules: {
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
		'import/no-extraneous-dependencies': ['error', {
			devDependencies: ['**/*.test.js', '**/*.test.ts'],
		}],
		'no-underscore-dangle': ['error', { allow: ['__', '_id', '_', '_source', '_scroll_id', '_embedded'] }],
		semi: 'off',
  	'@typescript-eslint/semi': ['error'],
		indent: ['error', 'tab'],
		quotes: ['error', 'single'],
		'no-mixed-operators': 'off',
		'arrow-parens': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/no-var-requires': 0,
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'no-param-reassign': [2, {
			props: false,
		}],
		'object-curly-newline': 0,
		'max-len': ['error', { code: 100, ignoreComments: true }],
		'no-unused-vars': ['error', { vars: 'all', args: 'after-used', varsIgnorePattern: '^(should|expect)$' }],
		'no-tabs': 0,
	},
};
