import { defineCollection } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

const about = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		tags: z.array(z.string()),
		image: z.string().optional(),
	})
})

export const collections = {
	docs: defineCollection({ schema: docsSchema() }),
	'about': about,
};
