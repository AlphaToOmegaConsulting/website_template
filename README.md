# Astro Multilingual Website

A multilingual static website built with Astro, TypeScript, and Tailwind CSS, organized as a pnpm monorepo.

## Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

## Installation

### Install pnpm

If you don't have pnpm installed, install it globally:

```bash
npm install -g pnpm@8.15.0
```

Or using other methods: https://pnpm.io/installation

### Install dependencies

```bash
pnpm install
```

## Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run linting
pnpm lint

# Format code
pnpm format

# Type checking
pnpm typecheck
```

## Project Structure

```
/
├── apps/
│   └── website/          # Main Astro application
├── packages/             # Shared packages (future)
├── pnpm-workspace.yaml   # pnpm workspace configuration
└── package.json          # Root package.json with workspace scripts
```

## Workspace Commands

All commands are run from the root of the monorepo:

- `pnpm dev` - Start the website development server
- `pnpm build` - Build the website for production
- `pnpm lint` - Lint the codebase
- `pnpm format` - Format code with Prettier
- `pnpm typecheck` - Run TypeScript type checking

## Verify Workspace Setup

After installing pnpm, verify the workspace is correctly configured:

```bash
# Check pnpm version
pnpm -v

# List all workspace packages
pnpm list -r --depth -1
```

You should see the `website` package listed in the workspace.
