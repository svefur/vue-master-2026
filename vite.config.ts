import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

export default defineConfig({
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	plugins: [
		VueRouter({
			dts: 'typed-router.d.ts', // matcher include i tsconfig ✔
		}),
		vue(),
	],
})
