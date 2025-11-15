import { defineCollection, z } from 'astro:content';

// Page Collection
const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lang: z.enum(['fr', 'en']),
    publishDate: z.coerce.date(),
    updateDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    seo: z.object({
      ogImage: z.string().optional(),
      noindex: z.boolean().default(false),
    }).optional(),
  }),
});

// Section Collection - Simplified pragmatic approach
// Validation is minimal by design for easier multi-brand adaptation
const sectionsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    type: z.enum(['hero', 'features', 'cta', 'events', 'about', 'team']),
    order: z.number(),
    visible: z.boolean().default(true),
    data: z.any(), // Pragmatic - no over-validation, data structure validated by components
  }),
});

// Event Collection
const eventsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    location: z.string(),
    description: z.string(),
    lang: z.enum(['fr', 'en']),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    registrationUrl: z.string().url().optional(),
  }),
});

export const collections = {
  pages: pagesCollection,
  sections: sectionsCollection,
  events: eventsCollection,
};
