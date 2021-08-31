module.exports = {
	root: true,
	extends: ['react-app', 'plugin:prettier/recommended'],
	rules: {
		'prettier/prettier': [
			'error',
			{
				singleQuote: true,
				semi: true,
				useTabs: true,
				tabWidth: 2,
				trailingComma: 'all',
				printWidth: 80,
				bracketSpacing: true,
				arrowParens: 'avoid',
			},
		],
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
	},
};
