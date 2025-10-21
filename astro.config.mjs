import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'My Docs',
			social: [
				{ icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/jccpalmer' },
				{ icon: 'github', label: 'GitHub', href: 'https://www.github.com/jccpalmer'},
			],
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
						{ label: 'Pi-hole', slug: 'software/pihole'},
					],
				},
				{
					label: 'Hardware',
					items: [
						{ label: 'TrueNAS Scale', slug: 'hardware/truenas-scale' },
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
						{ label: 'About me', slug: 'about/about-me' },
					],
				},
			],
		}),
	],
});
