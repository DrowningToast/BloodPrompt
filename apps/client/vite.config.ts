import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			strategies: 'generateSW',
			srcDir: 'src',
			manifest: {
				name: 'BloodPrompt',
				short_name: 'BloodPrompt',
				start_url: '/',
				scope: '/',
				icons: [
					{
						src: 'icons/icon-192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'icons/icon-512.png',
						sizes: '512x512',
						type: 'image/png'
					}
				],
				theme_color: '#1E3A8A',
				background_color: '#1E3A8A',
				display: 'standalone',
				orientation: 'portrait'
			}
			/* other pwa options */
		})
	]
});
