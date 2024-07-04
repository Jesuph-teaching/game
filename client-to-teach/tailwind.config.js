import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';
import Rotate3D from '@xpd/tailwind-3dtransforms';
import daisyUIConfig from './config/daisyUIConfig';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

	plugins: [typography, daisyui, Rotate3D],
	daisyui: daisyUIConfig,
};
