This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---

# CAR(E) — Semester Project

## Overview

CAR(E) is a car-care and automotive services web application developed as a semester project for Human–Computer Interaction (HCI). It brings together information about car maintenance and repair, service-related pages, and user-facing features in a responsive Next.js application.

This directory contains the application source code. The broader `HCI-2024-2025` repository also includes coursework and design-related materials.

## Features

- **Automotive information:** pages covering maintenance, safety and reliability, customization, and efficiency and performance.
- **Service discovery:** pages for finding shops and viewing individual shop details.
- **Meeting booking interface:** a dedicated booking page.
- **User-facing pages:** profile, authentication-related functionality, and an about page.
- **Guides and tutorials:** dedicated tutorial content and home-page sections for guides, services, and testimonials.
- **Responsive interface:** reusable React components and Tailwind CSS styling.

> Some features may depend on external services or configuration. The presence of a page or integration does not imply that every workflow has been tested end-to-end.

## Technology Stack

| Area | Technologies |
| --- | --- |
| Framework | Next.js (App Router), React |
| Language | TypeScript |
| Styling | Tailwind CSS, CSS |
| Authentication / backend services | Supabase |
| Database tooling | PostgreSQL, Drizzle ORM |
| Content integration | Contentful |
| Icons / UI utilities | Heroicons, Lucide React, React Icons |

## Project Structure

```text
semester-project/
├── public/                 # Static images and assets
├── src/
│   ├── app/                # Pages, layouts, sections, and API routes
│   │   ├── api/            # Application API endpoints
│   │   ├── book_meeting/   # Meeting booking page
│   │   ├── car_repair_topics/
│   │   ├── find_our_shops/
│   │   ├── tutorials/
│   │   └── user_profile/
│   ├── components/         # Shared UI components
│   └── lib/                # Supabase, database, and Contentful integrations
├── package.json
├── drizzle.config.ts
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm
- Access to the external services required by the features you want to run (such as Supabase, PostgreSQL, and Contentful)

### Install and run

From the `semester-project` directory:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

For other available commands, see `package.json` (`build`, `start`, `lint`, and `type-check`).

### Environment variables

The source code references the following environment variables:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
DATABASE_URL=
CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_TOKEN=
```

Configure the appropriate values in a local environment file (for example, `.env.local`). **Never commit credentials or secret tokens.** External-service-dependent functionality may not work without valid configuration.

## Notes

This is an academic semester project. It is intended to demonstrate application structure, interface development, and integration of web technologies. Deployment and complete end-to-end operation are not guaranteed by the repository alone.

