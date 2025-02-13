import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'My Docs',
			social: {
				linkedin: 'https://linkedin.com/in/jccpalmer',
				github: 'https://github.com/jccpalmer/docs',
			},
			favicon: 'favicon.svg',
			sidebar: [
				{
					label: 'Getting started',
					items: [
						{ label: 'Welcome!', slug: 'getting-started/landing'},
					],
				},
				{
					label: 'Docker',
					items: [
						{ label: 'Grav', slug: 'docker/grav' },
						{ label: 'Gluetun', slug: 'docker/gluetun' },
						{ label: 'Deluge', slug: 'docker/deluge-vpn' },
						{ label: 'Calibre', slug: 'docker/calibre' },
						{ label: 'Nginx Proxy Manager', slug: 'docker/npm' },
					],
				},
				{
					label: 'Software',
					items: [
						{ label: 'Hugo', slug: 'software/hugo' },
						{ label: 'Starlight', slug: 'software/starlight' },
						{ label: 'Pi-hole', slug: 'software/pi-hole' },
					],
				},
				{
					label: 'Hardware',
					items: [
						{ label: 'TrueNAS Scale', slug: 'hardware/truenas-scale' },
						{ label: 'BlueBubbles', slug: 'hardware/bluebubbles' },
					],
				},
				{
                    label: 'Mock docs',
					items: [
						{ label: 'Calibre Web', slug: 'mock/calibre-web' },
					],
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
