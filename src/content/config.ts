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

// Section Data Schemas - Strict validation by type
const heroDataSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  cta: z.object({
    label: z.string(),
    href: z.string(),
    variant: z.enum(['primary', 'secondary', 'ghost']).optional(),
  }).optional(),
  secondaryCta: z.object({
    label: z.string(),
    href: z.string(),
  }).optional(),
  image: z.object({
    src: z.string(),
    alt: z.string(),
  }).optional(),
  video: z.object({
    src: z.string(),
    poster: z.string().optional(),
    overlay: z.boolean().optional(),
  }).optional(),
  variant: z.enum(['default', 'centered', 'split']).optional(),
  background: z.string().optional(),
});

const featuresDataSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  features: z.array(z.object({
    icon: z.string().optional(),
    iconType: z.enum(['emoji', 'image', 'svg']).optional(),
    title: z.string(),
    description: z.string(),
  })),
  layout: z.enum(['grid', 'list']).optional(),
  columns: z.union([z.literal(2), z.literal(3), z.literal(4)]).optional(),
  variant: z.enum(['default', 'cards', 'minimal']).optional(),
  background: z.string().optional(),
});

const ctaDataSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  primaryCta: z.object({
    label: z.string(),
    href: z.string(),
  }),
  secondaryCta: z.object({
    label: z.string(),
    href: z.string(),
  }).optional(),
  variant: z.enum(['default', 'emphasized']).optional(),
  background: z.string().optional(),
});

const eventsDataSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  displayMode: z.enum(['upcoming', 'past', 'all']).optional(),
  limit: z.number().optional(),
});

const aboutDataSchema = z.object({
  title: z.string(),
  content: z.string(),
  columns: z.union([z.literal(1), z.literal(2), z.literal(3)]).optional(),
  image: z.object({
    src: z.string(),
    alt: z.string(),
    position: z.enum(['left', 'right']).optional(),
  }).optional(),
  stats: z.array(z.object({
    value: z.string(),
    label: z.string(),
  })).optional(),
  background: z.string().optional(),
});

const teamDataSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  authors: z.array(z.object({
    id: z.string(),
    name: z.string(),
    role: z.string(),
    avatar: z.string(),
    bio: z.string().optional(),
    social: z.object({
      twitter: z.string().optional(),
      linkedin: z.string().optional(),
      github: z.string().optional(),
    }).optional(),
  })),
  columns: z.union([z.literal(2), z.literal(3), z.literal(4)]).optional(),
  showPagination: z.boolean().optional(),
  itemsPerPage: z.number().optional(),
  background: z.string().optional(),
});

const domainsDataSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  domains: z.array(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    icon: z.string().optional(),
  })),
  columns: z.union([z.literal(2), z.literal(3)]).optional(),
  background: z.string().optional(),
});

const pricingDataSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  plans: z.array(z.object({
    name: z.string(),
    description: z.string().optional(),
    price: z.string(),
    period: z.string().optional(),
    features: z.array(z.string()),
    cta: z.object({
      label: z.string(),
      href: z.string(),
    }),
    badge: z.string().optional(),
    highlighted: z.boolean().optional(),
  })),
  columns: z.union([z.literal(2), z.literal(3), z.literal(4)]).optional(),
  background: z.string().optional(),
});

const faqDataSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  faqs: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })),
  layout: z.enum(['single', 'two-column']).optional(),
  background: z.string().optional(),
});

const testimonialsDataSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  testimonials: z.array(z.object({
    quote: z.string(),
    author: z.string(),
    role: z.string(),
    company: z.string().optional(),
    avatar: z.string().optional(),
    rating: z.number().min(1).max(5).optional(),
  })),
  columns: z.union([z.literal(1), z.literal(2), z.literal(3)]).optional(),
  background: z.string().optional(),
});

const contactDataSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  showContactInfo: z.boolean().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  socialLinks: z.array(z.object({
    platform: z.string(),
    url: z.string().url(),
  })).optional(),
  background: z.string().optional(),
});

const newsletterDataSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  variant: z.enum(['default', 'centered', 'inline']).optional(),
  background: z.string().optional(),
});

const galleryDataSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  images: z.array(z.object({
    src: z.string(),
    alt: z.string(),
    caption: z.string().optional(),
  })),
  layout: z.enum(['grid', 'masonry']).optional(),
  columns: z.union([z.literal(2), z.literal(3), z.literal(4)]).optional(),
  aspectRatio: z.enum(['square', 'video', 'portrait']).optional(),
  background: z.string().optional(),
});

const timelineDataSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  events: z.array(z.object({
    date: z.string(),
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
  })),
  layout: z.enum(['vertical', 'alternating']).optional(),
  background: z.string().optional(),
});

// Section Collection with discriminated union validation
const sectionsCollection = defineCollection({
  type: 'data',
  schema: z.discriminatedUnion('type', [
    z.object({
      type: z.literal('hero'),
      order: z.number(),
      visible: z.boolean().default(true),
      data: heroDataSchema,
    }),
    z.object({
      type: z.literal('features'),
      order: z.number(),
      visible: z.boolean().default(true),
      data: featuresDataSchema,
    }),
    z.object({
      type: z.literal('cta'),
      order: z.number(),
      visible: z.boolean().default(true),
      data: ctaDataSchema,
    }),
    z.object({
      type: z.literal('events'),
      order: z.number(),
      visible: z.boolean().default(true),
      data: eventsDataSchema,
    }),
    z.object({
      type: z.literal('about'),
      order: z.number(),
      visible: z.boolean().default(true),
      data: aboutDataSchema,
    }),
    z.object({
      type: z.literal('team'),
      order: z.number(),
      visible: z.boolean().default(true),
      data: teamDataSchema,
    }),
    z.object({
      type: z.literal('domains'),
      order: z.number(),
      visible: z.boolean().default(true),
      data: domainsDataSchema,
    }),
    z.object({
      type: z.literal('pricing'),
      order: z.number(),
      visible: z.boolean().default(true),
      data: pricingDataSchema,
    }),
    z.object({
      type: z.literal('faq'),
      order: z.number(),
      visible: z.boolean().default(true),
      data: faqDataSchema,
    }),
    z.object({
      type: z.literal('testimonials'),
      order: z.number(),
      visible: z.boolean().default(true),
      data: testimonialsDataSchema,
    }),
    z.object({
      type: z.literal('contact'),
      order: z.number(),
      visible: z.boolean().default(true),
      data: contactDataSchema,
    }),
    z.object({
      type: z.literal('newsletter'),
      order: z.number(),
      visible: z.boolean().default(true),
      data: newsletterDataSchema,
    }),
    z.object({
      type: z.literal('gallery'),
      order: z.number(),
      visible: z.boolean().default(true),
      data: galleryDataSchema,
    }),
    z.object({
      type: z.literal('timeline'),
      order: z.number(),
      visible: z.boolean().default(true),
      data: timelineDataSchema,
    }),
  ]),
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
