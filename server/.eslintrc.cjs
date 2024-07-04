module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:react-hooks/recommended',
		'plugin:prettier/recommended',
	],
	ignorePatterns: ['build', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['simple-import-sort', '@typescript-eslint'],
	rules: {
		'@typescript-eslint/no-explicit-any': 'off',
		'no-console': 'warn',
		'simple-import-sort/exports': 'error',
		'prettier/prettier': ['error', {}, { usePrettierrc: true }],
		'simple-import-sort/imports': [
			'error',
			{
				groups: [
					// Node.js builtins and third-party packages
					['^\\u0000'],
					['^react', '^@?\\w'],
					['^'], // <-- to match regular imports (not starting with a special character)

					// Your internal path aliases
					['^(~server|&server|$server|@server)(/.*|$)'],

					// Relative imports
					['^\\.\\.(?!/?$)', '^\\.\\./?$'],
					['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
				],
			},
		],
	},
};
