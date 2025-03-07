import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { cjsInterop } from "vite-plugin-cjs-interop";

export default defineConfig({
	plugins: [
		sveltekit(),
		cjsInterop({
			dependencies: [
				"@googlemaps/js-api-loader"
			]
		})
	],

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},

	server: {
		fs: {
			strict: false
		},
	},

	define: {
		'process.env': process.env
	}
});
