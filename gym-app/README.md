# Gym Landing Page & Admin Dashboard

This is a modern, static, Git-based CMS Gym website built with Next.js (App Router), Tailwind CSS, and Framer Motion.

## Features

- **Landing Page**: Fully responsive, dark-themed modern design suitable for fitness centers. Includes sections for Hero, Services, Pricing, and Contact.
- **Admin Dashboard**: A secure, database-free dashboard accessible at `/admin`.
- **Git-based CMS**: Edits made in the Admin dashboard are committed directly back to the `data/gym-config.json` file in this repository via the GitHub API. No database required!
- **ISR (Incremental Static Regeneration)**: Next.js revalidates the landing page on the fly after changes are published.

## Getting Started

### 1. Setup Environment Variables

Copy the `.env.example` file to `.env.local`:

`cp .env.example .env.local`

Fill in the required values in `.env.local`:

- `ADMIN_PASSWORD`: A secure password of your choice to access the `/admin` page.
- `GITHUB_TOKEN`: A GitHub Personal Access Token (PAT). Create one in your GitHub settings (Developer settings -> Personal access tokens). It needs `repo` scope to read and write to the repository.
- `GITHUB_OWNER`: Your GitHub username or organization name.
- `GITHUB_REPO`: The name of this repository.
- `GITHUB_BRANCH`: The branch to push changes to (e.g., `main`).

### 2. Install Dependencies

`npm install`

### 3. Run the Development Server

`npm run dev &`

Open [http://localhost:3000](http://localhost:3000) to view the landing page.
Open [http://localhost:3000/admin](http://localhost:3000/admin) to view the Admin dashboard.

## Deployment on Vercel

1. Push your code to GitHub.
2. Go to [Vercel](https://vercel.com/) and create a new project.
3. Import your GitHub repository.
4. During the setup, add all the environment variables from your `.env.local` file into the **Environment Variables** section on the Vercel dashboard.
5. Click **Deploy**.

Once deployed, any changes made via the `/admin` dashboard will trigger a commit to your GitHub repository and automatically revalidate the content on your live Vercel site.
