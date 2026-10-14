# Semester Project <!-- omit in toc -->

- [Project Structure](#project-structure)
- [My Project Links](#my-project-links)
  - [Semester Project](#semester-project)
  - [Semester Assignments](#semester-assignments)
- [Project Requirements](#project-requirements)
  - [Web Application Requirements](#web-application-requirements)
  - [Project Demonstration](#project-demonstration)

## Project Structure

- **`/semester-project`**: The source code of your main project
- **`/assignments`**: Results of your semester assignments
- **`/docs`**: If using GitHub for documentation (e.g., your final report in Markdown format)
- **`/misc`**: Miscellaneous files related to the project

## My Project Links

### Semester Project

- Link to my production version: [**Production Version**](https://carehci.vercel.app/)
- Link to my final report: [**Final Report**](https://quasar-jury-fe2.notion.site/CAR-E-26dc0545c87580ee93fbc47280bb718d) 

### Semester Assignments

- Link to Assignment 1: [**Assignment 1**](assignments/class_assignment_1/)
- Link to Assignment 2: [**Assignment 2**](assignments/class_assignment_2/)
- Link to Assignment 3: [**Assignment 3**](https://carehci.vercel.app/) 
- Link to Assignment 4: [**Assignment 4**](assignments/class_assignment_4/)
- Link to Assignment 5: [**Assignment 5**](https://carehci.vercel.app/)
- Link to Assignment 6: [**Assignment 6**](assignments/class_assignment_6/)

## Project Requirements

### Web Application Requirements

- [x] The application will be used from a web browser
- [x] It will be accessible on devices of different sizes
- [x] Users can search/filter products or services
- [x] The application will support user login for showing private content
- [x] One of the public pages will be a blog containing multiple posts with diverse content (images, videos, code snippets)
- [x] Part of the application's content will be stored in a remote headless CMS system

### Project Demonstration

- [x] Show the production version of the project
- [x] The production version will be deployed online on an appropriate cloud platform ([Vercel](https://vercel.com), [Netlify](https://www.netlify.com/) or a similar service)
- [x] Analyze the application's performance ([PageSpeed Insights](https://pagespeed.web.dev/))
- [x] The analysis results will be part of the final report


---

## CAR(E) — Project Overview

**CAR(E)** is a responsive web application developed as the main semester project for a Human–Computer Interaction course. It presents automotive services and information through a browser-based interface, with pages for discovering shops, requesting a meeting, reading car-related topics, and accessing a user profile.

**Live application:** [carehci.vercel.app](https://carehci.vercel.app/)  
**Final project report:** [CAR(E) report](https://quasar-jury-fe2.notion.site/CAR-E-26dc0545c87580ee93fbc47280bb718d)

### Technology Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend and data:** Next.js route handlers, Supabase, PostgreSQL, Drizzle ORM
- **Authentication:** Supabase authentication libraries
- **Content integration:** Contentful (listed as a project dependency)
- **Deployment:** Vercel (linked production application)

### Application Features

- Responsive interface for desktop and mobile screens
- Pages for browsing automotive topics, tutorials, and service shops
- Individual shop detail pages
- Meeting/appointment request page
- User profile and authentication-related functionality
- API routes for user and homepage-related data

> This overview describes functionality represented in the repository. It does not claim that every integration or external service is currently operational in the deployed application.

### Repository Layout

```text
.
├── semester-project/    # Next.js application source code
├── assignments/         # HCI coursework and design exercises
├── docs/                # Project documentation
└── misc/                # Additional project materials
```

### Run Locally

**Prerequisites:** Node.js and npm. Some features require access to the project's configured external services and environment variables.

```bash
cd semester-project
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Other commands defined in `semester-project/package.json` include `npm run build`, `npm run start`, and `npm run type-check`.

**Configuration:** Supabase, database, and CMS integrations may require environment variables and credentials. These are not provided in this README; do not commit secret keys or `.env` files to a public repository.

### Design and Coursework

The repository also includes Human–Computer Interaction assignments covering user personas, information architecture, Figma prototypes, and responsive interface development. See the [assignments directory](assignments/) and the [final report](https://quasar-jury-fe2.notion.site/CAR-E-26dc0545c87580bb718d) for additional context.

