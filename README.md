# Kedar Nath Sahu: Portfolio

Next.js 14 portfolio (your original design) with:

- **Visitor comments** that stay hidden until you approve them (home page + every blog post)
- **Blog** you write in Markdown from a private `/admin` page, with draft and publish
- **Admin panel** at `/admin` (password protected): approve, unpublish or delete comments; create, edit, publish and delete posts

## 1. Run locally

```bash
npm install
cp .env.example .env.local      # then edit ADMIN_PASSWORD and ADMIN_SECRET
npm run dev                     # http://localhost:3000
```

Without a database, data lives in memory and resets when the server restarts. That is fine for trying things out.

## 2. Push to GitHub

```bash
git init
git add .
git commit -m "Portfolio site"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo>.git
git push -u origin main
```

`.env.local` is git-ignored, so your password is never uploaded.

## 3. Deploy on Vercel

1. vercel.com -> **Add New -> Project** -> import the GitHub repo -> **Deploy**.
2. In the project, open **Storage** (or the Marketplace) and add **Upstash Redis** (free tier). Connect it to this project. This adds the database environment variables automatically. The code accepts either `UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN` or `KV_REST_API_URL`/`KV_REST_API_TOKEN`.
3. **Settings -> Environment Variables**, add:
   - `ADMIN_PASSWORD`: the password you will use at `/admin`
   - `ADMIN_SECRET`: a long random string (`openssl rand -hex 32`)
   - `NEXT_PUBLIC_SITE_URL`: your live URL, e.g. `https://kedar.vercel.app`
4. **Redeploy** so the variables take effect.

Vercel's filesystem is read-only at runtime, which is why comments and posts go to Redis instead of files.

## 4. Day-to-day use

**Moderate comments:** open `/admin` -> *Comments*. New comments appear under **pending** (the tab shows a count). Click **Approve & publish** and it goes live on the site within seconds. **Unpublish** hides it again; **Delete** removes it. Commenters' emails are only visible to you.

**Publish a blog post:** `/admin` -> *Blog posts* -> **New post**. Write in Markdown (headings, lists, tables, code blocks, links, images by URL). Use **Preview** to check, set Status to *Published*, **Save post**. Drafts are invisible to visitors.

## 5. Customize

- All portfolio text (skills, experience, certifications, contact details) is in `lib/data.js`.
- CV button: copy your PDF to `public/` and set `cvUrl` in `lib/data.js` (e.g. `'/Kedar-CV.pdf'`).
- Photo: replace `public/profile.jpg` (the extracted one is small, so a larger square photo will look sharper).
- Colors and layout: `app/globals.css` (your original styles are at the top).

## Built-in protections

Comments are rate-limited (5/hour per IP) with a hidden honeypot field for bots; all text is rendered escaped, so scripts in comments cannot run; Markdown does not allow raw HTML; admin login is rate-limited and uses a signed, HTTP-only cookie that expires after 12 hours. The contact form still opens the visitor's email app, as in your original design.

## Project map

```
app/page.js              home page
app/blog/                blog list and post pages
app/admin/               admin page (UI in components/AdminApp.js)
app/api/comments/        public: submit a comment
app/api/admin/           private: login, comments, posts
lib/store.js             database (Upstash Redis, memory fallback for local dev)
lib/auth.js              admin login cookie
lib/data.js              your portfolio content
```
