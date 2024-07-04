import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import alias from './config/alias';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias,
	},
	envPrefix: 'WYC_',
});
