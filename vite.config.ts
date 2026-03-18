import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
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
		AutoImport({
			include: [
				/\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
				/\.vue$/,
				/\.vue\?vue/, // .vue
				/\.vue\.[tj]sx?\?vue/, // .vue (vue-loader with experimentalInlineMatchResource enabled)
				/\.md$/, // .md
			],
			imports: [
				// presets
				'vue',
				VueRouterAutoImports,
				{
					pinia: ['defineStore', 'acceptHMRUpdate', 'storeToRefs'],
				},
			],
			dts: true,
			viteOptimizeDeps: true,
			dirs: ['src/stores/**', 'src/composables/**'],
		}),
		Components({
			/* options */
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
