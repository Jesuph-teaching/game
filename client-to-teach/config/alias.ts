import path from 'path';

const alias = [
	{ find: '&client', replacement: path.resolve(__dirname, '../src/config') },
	{
		find: '#client',
		replacement: path.resolve(__dirname, '../src/components'),
	},
	{ find: '$client', replacement: path.resolve(__dirname, '../src/api') },
	{ find: '@client', replacement: path.resolve(__dirname, '../src') },
	{ find: '!common', replacement: path.resolve(__dirname, '../src/types') },
];
export default alias;
