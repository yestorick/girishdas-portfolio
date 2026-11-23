# Girish Das — Personal Portfolio Website

A fast, responsive, neo-brutalist personal portfolio and blog designed for **Girish Das**, built with **Next.js 15 (App Router)**, **Tailwind CSS**, and **Supabase (PostgreSQL & Storage)**.

Deployed live on Vercel at [girishdas.vercel.app](https://girishdas.vercel.app).

---

## ✨ Features

- **Neo-Brutalist Aesthetic**: Handcrafted high-contrast borders, tactile drop shadows, and soft pastel color blocking matching the custom portfolio wireframe.
- **100% Mobile Responsive**: Fluid layouts that scale from small mobile viewports to desktop ultra-wide displays.
- **Structured Supabase CMS**:
  - Edit personal bio, hero headlines, resume links, and status badges (`site_profile`).
  - Update real-time status: what you're building, learning, reading, and your location (`right_now`).
  - Manage work experiences & education timeline (`experiences`).
  - Add & organize categorized tech stacks (`tech_stack`).
  - Showcase recent work & projects with tags, colors, and live links (`projects`).
  - Share favorite books, music, movies, and developer tools (`favorites`).
  - Write & publish Markdown blog articles (`posts`).
- **Resilient Fallback Layer**: If Supabase credentials are not yet linked, the website automatically falls back to clean default mock data so the site never crashes.
- **Built-in Admin Guide**: Interactive instructions at `/admin` explaining how to add and edit records in Supabase.

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/yestorick/girishdas-portfolio.git
cd girishdas-portfolio
npm install
```

### 2. Configure Supabase
1. Create a free project at [supabase.com](https://supabase.com).
2. In the Supabase **SQL Editor**, paste the contents of `supabase/schema.sql` and click **Run**.
3. Copy your project URL and Anon key from **Settings > API**.
4. Create a `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view your site.

---

## 🛠️ Deploying to Vercel

1. Push this repository to GitHub.
2. In the Vercel Dashboard, click **Add New > Project** and import `girishdas-portfolio`.
3. Add the two environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Under **Settings > Domains**, add **`girishdas.vercel.app`**.
