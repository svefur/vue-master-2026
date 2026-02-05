import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'

export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	plugins: [
		VueRouter({
			dts: 'typed-router.d.ts', // matcher include i tsconfig ✔
		}),
		vue({
			template: {
				compilerOptions: {
					isCustomElement: (element) => element.startsWith('iconify-icon'),
				},
			},
		}),
		tailwindcss(),
	],
})
