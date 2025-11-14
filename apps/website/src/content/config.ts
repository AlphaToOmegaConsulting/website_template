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

// Section Collection
const sectionsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    type: z.enum(['hero', 'about', 'features', 'events', 'cta']),
    order: z.number(),
    visible: z.boolean().default(true),
    data: z.record(z.any()),
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

// Data Collections
const authorsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    name: z.string(),
    role: z.string(),
    avatar: z.string(),
    bio: z.string(),
    social: z.object({
      twitter: z.string().optional(),
      github: z.string().optional(),
      linkedin: z.string().optional(),
    }).optional(),
  }),
});

const tagsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    color: z.string().optional(),
  }),
});

const domainsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    icon: z.string().optional(),
  }),
});

export const collections = {
  pages: pagesCollection,
  sections: sectionsCollection,
  events: eventsCollection,
  authors: authorsCollection,
  tags: tagsCollection,
  domains: domainsCollection,
};
