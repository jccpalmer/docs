import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'My Docs',
			social: {
				mastodon: 'https://toot.community/@jccpalmer',
				linkedin: 'https://linkedin.com/in/jccpalmer',
				github: 'https://github.com/jccpalmer/docs',
			},
			sidebar: [
				{
					label: 'Docker',
					autogenerate: { directory: 'docker' ,}
				},
				{
					label: 'Software',
					autogenerate: { directory: 'software' },
				},
				{
					label: 'Hardware',
					autogenerate: { directory: 'hardware' },
				},
				{
					label: 'About',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'About me', slug: 'about/about-me' },
					],
				},
			],
		}),
	],
});
