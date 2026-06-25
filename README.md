# Unserious Research

> Rigorous answers to questions nobody asked.

A small Next.js site for publishing not-quite-academic white papers, running at
`ur.luis-st.net`. A public part lists and renders the papers; a VPN-protected
admin part manages them.

## Stack

- **Next.js 15** (App Router) + **TypeScript**, custom `server.js`
- **Postgres** + **Prisma** (PDFs stored as binary, markdown as text, bibtex
  sources extracted into their own table)
- **Tailwind CSS 4** on a warm paper base (`#FBFAF8`); simple shadcn-style
  components
- Markdown rendering with GFM, KaTeX math and Prism syntax highlighting

## Features

- **Home** — overview cards (icon, title, description) + a "not quotable" banner
  linking to the funny **About** page.
- **Paper page** — Abstract / Content / Sources / Download tabs. Content shows a
  faded preview that expands into a fullscreen, reader-mode-friendly view with
  system/light/dark theme (scoped to that view only). Sources are parsed from
  BibTeX; the tab is disabled when there are none. Download lists every language
  with its PDF SHA-256.
- **i18n** — English + German UI (English fallback), extensible via the admin
  language manager. Papers can exist in any subset of languages.
- **Admin** (`/admin`) — list, add (language picker → tabbed multi-language
  form), edit and delete papers; manage paper languages. Timestamps and PDF
  hashes are computed server-side and never user-settable.

## VPN protection

`/admin` is gated two ways:

1. **nginx** restricts the route to `10.2.0.0/16` (see `nginx.example.conf`).
2. **Middleware** (`src/middleware.ts`) re-checks the forwarded client IP
   against `ADMIN_ALLOWED_CIDR` and rewrites outside requests to a warning page.
   The gate is bypassed when `NODE_ENV !== production` for local development.

## Configuration

Copy `template.env` to `.env` and fill it in. Key variables:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Postgres connection string |
| `POSTGRES_USER` / `POSTGRES_PASSWORD` / `POSTGRES_DB` | bundled DB credentials |
| `ADMIN_ALLOWED_CIDR` | CIDR allowed to reach `/admin` (default `10.2.0.0/16`) |
| `WEBSITE_OWNER`, `OWNER_*` | imprint details |

## Development

Requires **Node 24 (LTS)** for Prisma 7 (20.19+/22.12+ also work). An `.nvmrc` is provided:

```bash
nvm use                     # Node 24.11
npm install
# point DATABASE_URL at a local Postgres, then:
npx prisma db push
npx prisma db seed          # seeds English + German
npm run dev
```

Prisma 7 notes: the client is generated into `src/generated/prisma` (git-ignored),
the connection lives in `prisma.config.ts` (CLI) / a `pg` driver adapter
(runtime), and `.env` is loaded explicitly via `dotenv`.

## Deployment (Docker)

```bash
cp template.env .env        # edit values
docker compose up -d --build
```

The web container (Node 24 base) runs `prisma db push` (sync schema) and
`prisma db seed` on startup. Point nginx at it using `nginx.example.conf`.
