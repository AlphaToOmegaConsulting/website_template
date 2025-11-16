# Primitive Components Documentation

Primitive components are the low-level, reusable building blocks of the Alpha WebCore v3 template. They are brand-agnostic, highly composable, and follow strict accessibility guidelines.

## Overview

The template includes **10 primitive components** organized in `src/components/primitives/`:

1. [Button](#button) - Interactive button element
2. [ButtonLink](#buttonlink) - Link styled as a button
3. [Card](#card) - Content container
4. [Input](#input) - Text input field
5. [Textarea](#textarea) - Multi-line text input
6. [Select](#select) - Dropdown selection
7. [Checkbox](#checkbox) - Single checkbox
8. [Radio](#radio) - Radio button
9. [Alert](#alert) - Notification component
10. [Badge](#badge) - Label/tag component
11. [Icon](#icon) - SVG icon wrapper
12. [Dialog](#dialog) - Modal dialog

---

## Button

**File**: `src/components/primitives/Button.astro`

Interactive button component with multiple variants and sizes.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | `'primary'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |
| `disabled` | `boolean` | `false` | Disabled state |
| `class` | `string` | `''` | Additional CSS classes |

### Usage

```astro
---
import Button from '@/components/primitives/Button.astro';
---

<!-- Primary button -->
<Button variant="primary" size="md">
  Click me
</Button>

<!-- Secondary button -->
<Button variant="secondary" size="lg">
  Learn More
</Button>

<!-- Ghost button -->
<Button variant="ghost" size="sm">
  Cancel
</Button>

<!-- Disabled button -->
<Button variant="primary" disabled>
  Processing...
</Button>

<!-- Submit button -->
<Button type="submit" variant="primary">
  Submit Form
</Button>
```

### Accessibility

- Uses semantic `<button>` element
- Includes `aria-disabled` when disabled
- Focus ring for keyboard navigation
- Cursor changes to `not-allowed` when disabled

---

## ButtonLink

**File**: `src/components/primitives/ButtonLink.astro`

Link component styled as a button, perfect for navigation.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | **required** | Link destination |
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | `'primary'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `target` | `'_blank' \| '_self'` | `'_self'` | Link target |
| `rel` | `string` | auto | Link relationship (auto-adds for external) |
| `class` | `string` | `''` | Additional CSS classes |

### Usage

```astro
---
import ButtonLink from '@/components/primitives/ButtonLink.astro';
---

<!-- Internal navigation -->
<ButtonLink href="/en/events" variant="primary">
  View Events
</ButtonLink>

<!-- External link -->
<ButtonLink href="https://example.com" target="_blank" variant="secondary">
  Visit Website
</ButtonLink>

<!-- Ghost link button -->
<ButtonLink href="#section" variant="ghost">
  Scroll Down
</ButtonLink>
```

### Features

- Automatic base path handling for GitHub Pages
- Auto-adds `rel="noopener noreferrer"` for `target="_blank"`
- Same visual styles as Button component
- Accessible focus states

---

## Card

**File**: `src/components/primitives/Card.astro`

Container component for grouping content.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'bordered' \| 'elevated'` | `'default'` | Card style |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Internal padding |
| `class` | `string` | `''` | Additional CSS classes |

### Usage

```astro
---
import Card from '@/components/primitives/Card.astro';
---

<!-- Default card -->
<Card>
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</Card>

<!-- Bordered card -->
<Card variant="bordered" padding="lg">
  <h3>Bordered Card</h3>
  <p>With large padding.</p>
</Card>

<!-- Elevated card with no padding -->
<Card variant="elevated" padding="none">
  <img src="/image.jpg" alt="Image" />
  <div class="p-4">
    <h3>Image Card</h3>
  </div>
</Card>
```

---

## Input

**File**: `src/components/primitives/Input.astro`

Form input field with validation and error states.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'url'` | `'text'` | Input type |
| `name` | `string` | **required** | Input name attribute |
| `label` | `string` | **required** | Input label |
| `placeholder` | `string` | `''` | Placeholder text |
| `value` | `string` | `''` | Default value |
| `required` | `boolean` | `false` | Required field |
| `disabled` | `boolean` | `false` | Disabled state |
| `error` | `string` | `''` | Error message |
| `class` | `string` | `''` | Additional CSS classes |

### Usage

```astro
---
import Input from '@/components/primitives/Input.astro';
---

<form>
  <!-- Basic text input -->
  <Input
    type="text"
    name="name"
    label="Your Name"
    placeholder="John Doe"
    required
  />

  <!-- Email input -->
  <Input
    type="email"
    name="email"
    label="Email Address"
    required
  />

  <!-- Input with error -->
  <Input
    type="text"
    name="username"
    label="Username"
    value="invalid_user"
    error="Username is already taken"
  />

  <!-- Disabled input -->
  <Input
    type="text"
    name="readonly"
    label="Read Only"
    value="Cannot edit"
    disabled
  />
</form>
```

### Accessibility

- Labels properly associated with inputs
- Error messages announced via `aria-describedby`
- `aria-invalid` set when error present
- Focus ring for keyboard navigation

---

## Textarea

**File**: `src/components/primitives/Textarea.astro`

Multi-line text input field.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | **required** | Textarea name |
| `label` | `string` | **required** | Textarea label |
| `placeholder` | `string` | `''` | Placeholder text |
| `rows` | `number` | `4` | Number of rows |
| `required` | `boolean` | `false` | Required field |
| `disabled` | `boolean` | `false` | Disabled state |
| `error` | `string` | `''` | Error message |
| `class` | `string` | `''` | Additional CSS classes |

### Usage

```astro
---
import Textarea from '@/components/primitives/Textarea.astro';
---

<Textarea
  name="message"
  label="Your Message"
  rows={6}
  placeholder="Tell us about your project..."
  required
/>
```

---

## Select

**File**: `src/components/primitives/Select.astro`

Dropdown selection component.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | **required** | Select name |
| `label` | `string` | **required** | Select label |
| `options` | `Array<{value: string, label: string}>` | **required** | Options array |
| `value` | `string` | `''` | Selected value |
| `required` | `boolean` | `false` | Required field |
| `disabled` | `boolean` | `false` | Disabled state |
| `error` | `string` | `''` | Error message |
| `class` | `string` | `''` | Additional CSS classes |

### Usage

```astro
---
import Select from '@/components/primitives/Select.astro';

const countries = [
  { value: 'fr', label: 'France' },
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
];
---

<Select
  name="country"
  label="Select Country"
  options={countries}
  required
/>
```

---

## Checkbox

**File**: `src/components/primitives/Checkbox.astro`

Single checkbox input.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | **required** | Checkbox name |
| `label` | `string` | **required** | Checkbox label |
| `checked` | `boolean` | `false` | Checked state |
| `disabled` | `boolean` | `false` | Disabled state |
| `required` | `boolean` | `false` | Required field |
| `error` | `string` | `''` | Error message |
| `class` | `string` | `''` | Additional CSS classes |

### Usage

```astro
---
import Checkbox from '@/components/primitives/Checkbox.astro';
---

<Checkbox
  name="terms"
  label="I agree to the terms and conditions"
  required
/>

<Checkbox
  name="newsletter"
  label="Subscribe to newsletter"
  checked
/>
```

---

## Radio

**File**: `src/components/primitives/Radio.astro`

Radio button input.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | **required** | Radio group name |
| `value` | `string` | **required** | Radio value |
| `label` | `string` | **required** | Radio label |
| `checked` | `boolean` | `false` | Checked state |
| `disabled` | `boolean` | `false` | Disabled state |
| `class` | `string` | `''` | Additional CSS classes |

### Usage

```astro
---
import Radio from '@/components/primitives/Radio.astro';
---

<fieldset>
  <legend>Select Plan</legend>
  <Radio name="plan" value="basic" label="Basic" />
  <Radio name="plan" value="pro" label="Pro" checked />
  <Radio name="plan" value="enterprise" label="Enterprise" />
</fieldset>
```

---

## Alert

**File**: `src/components/primitives/Alert.astro`

Notification/feedback component.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Alert type |
| `title` | `string` | `''` | Alert title |
| `dismissible` | `boolean` | `false` | Show close button |
| `class` | `string` | `''` | Additional CSS classes |

### Usage

```astro
---
import Alert from '@/components/primitives/Alert.astro';
---

<!-- Info alert -->
<Alert variant="info" title="Information">
  This is an informational message.
</Alert>

<!-- Success alert -->
<Alert variant="success" title="Success!">
  Your changes have been saved.
</Alert>

<!-- Warning alert -->
<Alert variant="warning" title="Warning" dismissible>
  Please review your information.
</Alert>

<!-- Error alert -->
<Alert variant="error" title="Error">
  Something went wrong. Please try again.
</Alert>
```

---

## Badge

**File**: `src/components/primitives/Badge.astro`

Label/tag component for highlighting status or categories.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error'` | `'default'` | Badge style |
| `class` | `string` | `''` | Additional CSS classes |

### Usage

```astro
---
import Badge from '@/components/primitives/Badge.astro';
---

<Badge variant="default">New</Badge>
<Badge variant="primary">Featured</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Sold Out</Badge>
```

---

## Icon

**File**: `src/components/primitives/Icon.astro`

SVG icon wrapper component.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | **required** | Icon name |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Icon size |
| `class` | `string` | `''` | Additional CSS classes |

### Usage

```astro
---
import Icon from '@/components/primitives/Icon.astro';
---

<Icon name="calendar" size="md" />
<Icon name="location" size="sm" />
<Icon name="user" size="lg" class="text-brand-accent" />
```

---

## Dialog

**File**: `src/components/primitives/Dialog.astro`

Modal dialog component with native `<dialog>` element.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | **required** | Dialog unique ID |
| `title` | `string` | **required** | Dialog title |
| `description` | `string` | `''` | Dialog description |
| `class` | `string` | `''` | Additional CSS classes |

### Usage

```astro
---
import Dialog from '@/components/primitives/Dialog.astro';
import Button from '@/components/primitives/Button.astro';
---

<!-- Trigger button -->
<Button onclick="document.getElementById('myDialog').showModal()">
  Open Dialog
</Button>

<!-- Dialog -->
<Dialog id="myDialog" title="Confirmation">
  <p>Are you sure you want to proceed?</p>
  <div class="flex gap-4 mt-4">
    <Button variant="primary">Confirm</Button>
    <Button variant="ghost" onclick="document.getElementById('myDialog').close()">
      Cancel
    </Button>
  </div>
</Dialog>
```

### Accessibility

- Native `<dialog>` element with proper ARIA attributes
- Focus trap within dialog
- ESC key to close
- Click backdrop to close
- Accessible title and description

---

## Styling Philosophy

All primitive components follow these principles:

1. **Brand Tokens**: Use CSS variables from `tokens.css`:
   - `--brand-primary`, `--brand-accent`, etc.
   - `--color-text`, `--color-bg`, etc.

2. **Tailwind CSS**: Use Tailwind utilities for spacing, responsive design

3. **No Business Logic**: Primitives are pure UI components

4. **Composable**: Designed to be combined and nested

5. **Accessible**: ARIA attributes, focus management, keyboard navigation

---

## Best Practices

### ✅ DO

```astro
<!-- Use primitives for consistent styling -->
<Button variant="primary">Click me</Button>

<!-- Compose primitives together -->
<Card variant="elevated">
  <Badge variant="success">New</Badge>
  <h3>Card Title</h3>
  <ButtonLink href="/learn-more">Learn More</ButtonLink>
</Card>

<!-- Add custom classes when needed -->
<Button class="w-full mt-4" variant="primary">
  Full Width Button
</Button>
```

### ❌ DON'T

```astro
<!-- Don't recreate button styles inline -->
<a href="/page" class="px-4 py-2 bg-blue-500 text-white rounded">
  Link
</a> <!-- Use ButtonLink instead -->

<!-- Don't hardcode colors -->
<button class="bg-blue-500 hover:bg-blue-700">
  Click
</button> <!-- Use Button with variant -->

<!-- Don't mix multiple styling systems -->
<Button style="background: red; padding: 20px;">
  Bad
</Button>
```

---

## Testing

Unit tests for primitives are located in `tests/unit/primitives.test.ts`.

Run tests:
```bash
pnpm test
```

---

## Next Steps

- **Sections Documentation**: See [SECTIONS.md](./SECTIONS.md)
- **Theme Customization**: See [THEME_MIGRATION.md](./THEME_MIGRATION.md)
- **CMS Integration**: See [CMS_INTEGRATION.md](./CMS_INTEGRATION.md)
