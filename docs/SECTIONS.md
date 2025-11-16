# Section Components Documentation

Section components are high-level, page-building blocks that combine primitive components and content to create complete page sections. All sections are brand-agnostic, content-driven, and validated by strict Zod schemas.

## Overview

The template includes **14 section components** in `src/components/sections/`:

| Section | Purpose | Use Case |
|---------|---------|----------|
| [Hero](#hero) | Page header with CTA | Landing pages, home |
| [Features](#features) | Feature grid/list | Product features, services |
| [CTA](#cta) | Call-to-action block | Conversion points |
| [About](#about) | About/story section | Company info, mission |
| [Team](#team) | Team members grid | Team page, about us |
| [Events](#events) | Event listing | Events page, calendar |
| [Domains](#domains) | Categories/domains | Services, expertise areas |
| [Pricing](#pricing) | Pricing tables | Pricing page, plans |
| [FAQ](#faq) | Frequently asked questions | Support, help |
| [Testimonials](#testimonials) | Customer reviews | Social proof |
| [Contact](#contact) | Contact form | Contact page |
| [Newsletter](#newsletter) | Email signup | Newsletter subscription |
| [Gallery](#gallery) | Image gallery | Portfolio, projects |
| [Timeline](#timeline) | Event timeline | History, roadmap |

---

## Hero

**File**: `src/components/sections/Hero.astro`

Page header section with title, subtitle, CTA buttons, and optional image or video.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **required** | Main heading |
| `subtitle` | `string` | `''` | Subheading text |
| `cta` | `object` | `null` | Primary CTA `{label, href, variant?}` |
| `secondaryCta` | `object` | `null` | Secondary CTA `{label, href}` |
| `image` | `object` | `null` | Image `{src, alt}` |
| `video` | `object` | `null` | Video `{src, poster?, overlay?}` |
| `variant` | `'default' \| 'centered' \| 'split'` | `'default'` | Layout variant |
| `background` | `string` | `''` | Background color/class |
| `class` | `string` | `''` | Additional classes |

### Usage

```astro
---
import Hero from '@/components/sections/Hero.astro';
---

<!-- Default hero -->
<Hero
  title="Welcome to Our Platform"
  subtitle="Build amazing products faster"
  cta={{ label: 'Get Started', href: '/signup', variant: 'primary' }}
  secondaryCta={{ label: 'Learn More', href: '/about' }}
/>

<!-- Hero with image -->
<Hero
  title="Transform Your Business"
  subtitle="With our innovative solutions"
  image={{ src: '/hero.jpg', alt: 'Dashboard' }}
  variant="split"
/>

<!-- Hero with video background -->
<Hero
  title="See It In Action"
  subtitle="Experience the difference"
  video={{ src: '/video.mp4', poster: '/poster.jpg', overlay: true }}
  variant="centered"
/>
```

### Variants

- **default**: Left-aligned text, right image
- **centered**: Centered text, no image
- **split**: Full-width split layout

---

## Features

**File**: `src/components/sections/Features.astro`

Grid or list of features with icons, titles, and descriptions.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **required** | Section title |
| `subtitle` | `string` | `''` | Section subtitle |
| `features` | `array` | **required** | Features array `[{icon?, iconType?, title, description}]` |
| `layout` | `'grid' \| 'list'` | `'grid'` | Layout style |
| `columns` | `2 \| 3 \| 4` | `3` | Grid columns |
| `variant` | `'default' \| 'cards' \| 'minimal'` | `'default'` | Visual style |
| `background` | `string` | `''` | Background color/class |
| `class` | `string` | `''` | Additional classes |

### Usage

```astro
---
import Features from '@/components/sections/Features.astro';

const features = [
  {
    icon: '🚀',
    iconType: 'emoji',
    title: 'Fast Performance',
    description: 'Lightning-fast load times and smooth interactions',
  },
  {
    icon: '🔒',
    iconType: 'emoji',
    title: 'Secure',
    description: 'Enterprise-grade security and data protection',
  },
  {
    icon: '📱',
    iconType: 'emoji',
    title: 'Mobile-First',
    description: 'Optimized for all devices and screen sizes',
  },
];
---

<Features
  title="Why Choose Us"
  subtitle="Everything you need to succeed"
  features={features}
  columns={3}
  variant="cards"
/>
```

### Icon Types

- **emoji**: Unicode emoji (🚀, 📱)
- **image**: Image path (`/icons/rocket.svg`)
- **svg**: Inline SVG code

---

## CTA

**File**: `src/components/sections/CTA.astro`

Call-to-action section with primary and optional secondary buttons.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **required** | CTA title |
| `description` | `string` | `''` | CTA description |
| `primaryCta` | `object` | **required** | Primary button `{label, href}` |
| `secondaryCta` | `object` | `null` | Secondary button `{label, href}` |
| `variant` | `'default' \| 'emphasized'` | `'default'` | Visual style |
| `background` | `string` | `''` | Background color/class |
| `class` | `string` | `''` | Additional classes |

### Usage

```astro
---
import CTA from '@/components/sections/CTA.astro';
---

<CTA
  title="Ready to Get Started?"
  description="Join thousands of satisfied customers today"
  primaryCta={{ label: 'Sign Up Now', href: '/signup' }}
  secondaryCta={{ label: 'View Pricing', href: '/pricing' }}
  variant="emphasized"
/>
```

---

## About

**File**: `src/components/sections/About.astro`

About section with text content, optional image, and stats.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **required** | Section title |
| `subtitle` | `string` | `''` | Section subtitle |
| `content` | `string` | `''` | HTML content |
| `columns` | `array` | `null` | Multi-column content `[{title?, content}]` |
| `image` | `object` | `null` | Image `{src, alt, position?}` |
| `stats` | `array` | `null` | Stats `[{value, label}]` |
| `layout` | `'single' \| 'two-columns' \| 'with-image'` | `'single'` | Layout type |
| `columnsCount` | `2 \| 3` | `2` | Column count for multi-column |
| `class` | `string` | `''` | Additional classes |

### Usage

```astro
---
import About from '@/components/sections/About.astro';

const stats = [
  { value: '10K+', label: 'Customers' },
  { value: '50+', label: 'Countries' },
  { value: '99%', label: 'Satisfaction' },
];
---

<!-- With image and stats -->
<About
  title="About Our Company"
  content="<p>We are a leading provider of innovative solutions...</p>"
  image={{ src: '/about.jpg', alt: 'Team', position: 'right' }}
  stats={stats}
  layout="with-image"
/>
```

**Note**: Content is automatically sanitized for security. See `src/utils/html-sanitizer.ts`.

---

## Team

**File**: `src/components/sections/Team.astro`

Team members grid with photos, names, roles, and optional pagination.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **required** | Section title |
| `subtitle` | `string` | `''` | Section subtitle |
| `authors` | `array` | **required** | Team members `[{id, name, role, avatar, bio?, social?}]` |
| `columns` | `2 \| 3 \| 4` | `3` | Grid columns |
| `showPagination` | `boolean` | `false` | Enable pagination |
| `itemsPerPage` | `number` | `6` | Items per page |
| `background` | `string` | `''` | Background color/class |
| `class` | `string` | `''` | Additional classes |

### Usage

```astro
---
import Team from '@/components/sections/Team.astro';

const team = [
  {
    id: 'john',
    name: 'John Doe',
    role: 'CEO',
    avatar: '/team/john.jpg',
    bio: 'Visionary leader with 15 years of experience',
    social: {
      twitter: 'https://twitter.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
    },
  },
  // ... more team members
];
---

<Team
  title="Meet Our Team"
  subtitle="Experts dedicated to your success"
  authors={team}
  columns={3}
  showPagination={true}
  itemsPerPage={6}
/>
```

---

## Events

**File**: `src/components/sections/Events.astro`

Event listing section with filtering and content collection integration.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **required** | Section title |
| `subtitle` | `string` | `''` | Section subtitle |
| `displayMode` | `'upcoming' \| 'past' \| 'all'` | `'upcoming'` | Events to display |
| `limit` | `number` | `null` | Max events to show |
| `class` | `string` | `''` | Additional classes |

### Usage

```astro
---
import Events from '@/components/sections/Events.astro';
---

<!-- Show upcoming events -->
<Events
  title="Upcoming Events"
  subtitle="Join us at these exciting events"
  displayMode="upcoming"
  limit={6}
/>

<!-- Show all events -->
<Events
  title="All Events"
  displayMode="all"
/>
```

**Note**: Events are loaded from Content Collections (`src/content/events/`).

---

## Pricing

**File**: `src/components/sections/Pricing.astro`

Pricing tables with features, badges, and highlighted plans.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **required** | Section title |
| `subtitle` | `string` | `''` | Section subtitle |
| `plans` | `array` | **required** | Pricing plans `[{name, price, period?, features[], cta, badge?, highlighted?}]` |
| `columns` | `2 \| 3 \| 4` | `3` | Grid columns |
| `background` | `string` | `''` | Background color/class |
| `class` | `string` | `''` | Additional classes |

### Usage

```astro
---
import Pricing from '@/components/sections/Pricing.astro';

const plans = [
  {
    name: 'Basic',
    price: '$9',
    period: '/month',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    cta: { label: 'Get Started', href: '/signup?plan=basic' },
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    features: ['All Basic features', 'Feature 4', 'Feature 5', 'Priority support'],
    cta: { label: 'Get Started', href: '/signup?plan=pro' },
    badge: 'Most Popular',
    highlighted: true,
  },
];
---

<Pricing
  title="Choose Your Plan"
  subtitle="Flexible pricing for teams of all sizes"
  plans={plans}
  columns={3}
/>
```

---

## FAQ

**File**: `src/components/sections/FAQ.astro`

Frequently asked questions with accordion.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **required** | Section title |
| `subtitle` | `string` | `''` | Section subtitle |
| `faqs` | `array` | **required** | FAQ items `[{question, answer}]` |
| `layout` | `'single' \| 'two-column'` | `'single'` | Layout type |
| `background` | `string` | `''` | Background color/class |
| `class` | `string` | `''` | Additional classes |

### Usage

```astro
---
import FAQ from '@/components/sections/FAQ.astro';

const faqs = [
  {
    question: 'How do I get started?',
    answer: 'Simply sign up for an account and follow the onboarding guide.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers.',
  },
];
---

<FAQ
  title="Frequently Asked Questions"
  faqs={faqs}
  layout="two-column"
/>
```

---

## Testimonials

**File**: `src/components/sections/Testimonials.astro`

Customer testimonials with ratings and author info.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **required** | Section title |
| `subtitle` | `string` | `''` | Section subtitle |
| `testimonials` | `array` | **required** | Testimonials `[{quote, author, role, company?, avatar?, rating?}]` |
| `columns` | `1 \| 2 \| 3` | `2` | Grid columns |
| `background` | `string` | `''` | Background color/class |
| `class` | `string` | `''` | Additional classes |

### Usage

```astro
---
import Testimonials from '@/components/sections/Testimonials.astro';

const testimonials = [
  {
    quote: 'This product changed our business completely!',
    author: 'Jane Smith',
    role: 'CEO',
    company: 'Tech Corp',
    avatar: '/avatars/jane.jpg',
    rating: 5,
  },
];
---

<Testimonials
  title="What Our Customers Say"
  testimonials={testimonials}
  columns={2}
/>
```

---

## Contact

**File**: `src/components/sections/Contact.astro`

Contact form with optional contact information sidebar.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **required** | Section title |
| `subtitle` | `string` | `''` | Section subtitle |
| `showContactInfo` | `boolean` | `false` | Show contact info |
| `email` | `string` | `''` | Contact email |
| `phone` | `string` | `''` | Contact phone |
| `address` | `string` | `''` | Physical address |
| `socialLinks` | `array` | `null` | Social links `[{platform, url}]` |
| `background` | `string` | `''` | Background color/class |
| `class` | `string` | `''` | Additional classes |

### Usage

```astro
---
import Contact from '@/components/sections/Contact.astro';
---

<Contact
  title="Get In Touch"
  subtitle="We'd love to hear from you"
  showContactInfo={true}
  email="hello@example.com"
  phone="+1 (555) 123-4567"
  address="123 Main St, City, Country"
  socialLinks={[
    { platform: 'Twitter', url: 'https://twitter.com/example' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/company/example' },
  ]}
/>
```

---

## Newsletter

**File**: `src/components/sections/Newsletter.astro`

Email newsletter signup form.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **required** | Section title |
| `description` | `string` | `''` | Description text |
| `variant` | `'default' \| 'centered' \| 'inline'` | `'default'` | Layout variant |
| `background` | `string` | `''` | Background color/class |
| `class` | `string` | `''` | Additional classes |

### Usage

```astro
---
import Newsletter from '@/components/sections/Newsletter.astro';
---

<Newsletter
  title="Subscribe to Our Newsletter"
  description="Get the latest updates and exclusive content"
  variant="centered"
/>
```

---

## Gallery

**File**: `src/components/sections/Gallery.astro`

Image gallery with grid or masonry layout.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **required** | Section title |
| `subtitle` | `string` | `''` | Section subtitle |
| `images` | `array` | **required** | Images `[{src, alt, caption?}]` |
| `layout` | `'grid' \| 'masonry'` | `'grid'` | Layout type |
| `columns` | `2 \| 3 \| 4` | `3` | Grid columns |
| `aspectRatio` | `'square' \| 'video' \| 'portrait'` | `'square'` | Image aspect ratio |
| `background` | `string` | `''` | Background color/class |
| `class` | `string` | `''` | Additional classes |

### Usage

```astro
---
import Gallery from '@/components/sections/Gallery.astro';

const images = [
  { src: '/gallery/1.jpg', alt: 'Project 1', caption: 'Amazing project' },
  { src: '/gallery/2.jpg', alt: 'Project 2' },
  { src: '/gallery/3.jpg', alt: 'Project 3', caption: 'Beautiful work' },
];
---

<Gallery
  title="Our Portfolio"
  images={images}
  layout="masonry"
  columns={3}
  aspectRatio="video"
/>
```

---

## Timeline

**File**: `src/components/sections/Timeline.astro`

Event timeline for showing chronological events.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **required** | Section title |
| `subtitle` | `string` | `''` | Section subtitle |
| `events` | `array` | **required** | Timeline events `[{date, title, description, icon?}]` |
| `layout` | `'vertical' \| 'alternating'` | `'vertical'` | Layout type |
| `background` | `string` | `''` | Background color/class |
| `class` | `string` | `''` | Additional classes |

### Usage

```astro
---
import Timeline from '@/components/sections/Timeline.astro';

const events = [
  { date: '2020', title: 'Company Founded', description: 'Started with a vision', icon: '🚀' },
  { date: '2021', title: 'Series A', description: 'Raised $10M funding', icon: '💰' },
  { date: '2022', title: '10K Customers', description: 'Reached major milestone', icon: '🎉' },
];
---

<Timeline
  title="Our Journey"
  events={events}
  layout="alternating"
/>
```

---

## Content Collections Integration

Sections can be configured via JSON files in `src/content/sections/`.

### Example: Hero Section JSON

```json
{
  "type": "hero",
  "order": 1,
  "visible": true,
  "data": {
    "title": "Welcome to Our Platform",
    "subtitle": "Build amazing products faster",
    "cta": {
      "label": "Get Started",
      "href": "/signup",
      "variant": "primary"
    },
    "variant": "centered"
  }
}
```

All section data is validated by strict Zod schemas in `src/content/config.ts`.

---

## Best Practices

### ✅ DO

- Use sections for page-level layouts
- Combine with primitive components
- Leverage content collections for data
- Customize with `class` prop
- Use semantic HTML structure

### ❌ DON'T

- Don't nest sections inside sections
- Don't hardcode content in section components
- Don't override section structure (use custom sections instead)

---

## Next Steps

- **Primitives Documentation**: See [PRIMITIVES.md](./PRIMITIVES.md)
- **Theme Customization**: See [THEME_MIGRATION.md](./THEME_MIGRATION.md)
- **CMS Integration**: See [CMS_INTEGRATION.md](./CMS_INTEGRATION.md)
