# Kedar Nath Sahu: Portfolio Website

A Next.js 14 website with:

- **Portfolio** sections: hero, about, skills, featured projects, experience, certifications
- **Mentoring** section with Topmate booking, and a **LinkedIn connect** banner
- **Blog** you write from a private admin page
- **Testimonials**: visitors submit them (rating, photo, LinkedIn), and they appear only after **you approve**
- **Contact form**: messages land in your **admin panel** and, optionally, in your **email inbox**

> **The idea of this guide:** after the first setup you never need an AI assistant to change your content.
> Almost everything you want to edit is in **one file: `content/site.js`**.

---

## Contents

1. [One-time setup on your computer](#1-one-time-setup-on-your-computer)
2. [Everyday workflow: change content and publish](#2-everyday-workflow-change-content-and-publish)
3. [Where is everything? (cheat sheet)](#3-where-is-everything-cheat-sheet)
4. [Recipes: step-by-step edits](#4-recipes-step-by-step-edits)
5. [The admin panel](#5-the-admin-panel)
6. [Email alerts (optional, free)](#6-email-alerts-optional-free)
7. [First-time deployment (GitHub, Vercel, database)](#7-first-time-deployment-github-vercel-database)
8. [Environment variables](#8-environment-variables)
9. [Troubleshooting](#9-troubleshooting)
10. [Project map](#10-project-map)

---

## 1. One-time setup on your computer

**You need:** [Node.js](https://nodejs.org) (version 18 or newer, the LTS download), [Git](https://git-scm.com) and [VS Code](https://code.visualstudio.com).

Check Node and Git are installed (open the VS Code terminal with **Ctrl + `** ):

```bash
node -v
git -v
```

Then, inside the project folder:

```bash
npm install                  # downloads the libraries (first time only, takes a minute)
cp .env.example .env.local   # Windows PowerShell: Copy-Item .env.example .env.local
```

Open `.env.local` and set at least:

```
ADMIN_PASSWORD=choose-a-long-password
ADMIN_SECRET=any-long-random-text
```

Start the site:

```bash
npm run dev
```

Open **http://localhost:3000**. Leave this terminal running while you edit. Stop it any time with **Ctrl + C**.

> Locally (no database) comments, messages and blog posts are kept in memory and disappear when you stop the server.
> That is normal. The live site uses a real database (see section 7).

---

## 2. Everyday workflow: change content and publish

1. Open the folder in VS Code and run `npm run dev` in the terminal.
2. Edit the file (usually `content/site.js`) and press **Ctrl + S**. The browser at localhost:3000 updates by itself.
3. Happy with it? Publish:

```bash
git add .
git commit -m "Update certifications"
git push
```

Vercel notices the push and publishes automatically. It takes about a minute. Check progress in your Vercel project under **Deployments**.

**If you made a mistake and have NOT committed yet**, undo one file:

```bash
git checkout -- content/site.js
```

**If you already pushed a bad change**, undo the last commit safely:

```bash
git revert HEAD
git push
```

> Blog posts, testimonials and messages are **not** edited in code. They are managed in the admin page on the live site (section 5), and no `git push` is needed for them.

---

## 3. Where is everything? (cheat sheet)

| I want to change... | Open this file | Look for |
|---|---|---|
| My name, email, phone, location, LinkedIn, Topmate link, photo path, CV link | `content/site.js` | `export const profile` |
| Round icon buttons (LinkedIn, Topmate, Email) | `content/site.js` | `export const socials` |
| Top-of-page text: "Namaste, I'm", role line, summary, buttons, status pill | `content/site.js` | `export const hero` |
| The 4 numbers under the hero (18+ years etc.) | `content/site.js` | `export const stats` |
| Section titles and sub-texts | `content/site.js` | `export const sections` |
| About text and bullet points | `content/site.js` | `export const about` |
| Skills cards | `content/site.js` | `export const skills` |
| Featured projects (cards with pictures) | `content/site.js` | `export const projects` |
| Work experience | `content/site.js` | `export const experience` and `earlier` |
| Certifications, training, education | `content/site.js` | `certs`, `training`, `education` |
| "Mentor with Kedar" section | `content/site.js` | `export const mentoring` |
| LinkedIn banner | `content/site.js` | `export const linkedinBanner` |
| "Worked with Kedar? Share your experience" banner | `content/site.js` | `export const testimonialCta` |
| Footer line | `content/site.js` | `profile.footerLine` |
| My photo | `public/profile.jpg` | replace the file (same name) |
| Project pictures | `public/projects/` | see recipe 4.4 |
| Menu links at the top | `components/Nav.js` | the `LINKS` list |
| Colours, fonts, spacing | `app/sections.css` and `app/globals.css` | see recipe 4.8 |
| Page title / description shown on Google | `app/layout.js` | `metadata` |

**Rules when editing `content/site.js`:**

- Keep the quotes `' '` around text and the comma `,` at the end of each line.
- Apostrophes: write `’` (curly) or wrap the text in double quotes. Example: `"Let's talk"`.
- In `about.lead` you can put `**double asterisks**` around words to make them bold.
- If the page shows an error after saving, you probably removed a quote or comma. Press **Ctrl + Z** in VS Code to undo.

---

## 4. Recipes: step-by-step edits

### 4.1 Change my summary at the top
In `content/site.js`, edit `hero.summary`:

```js
summary: 'Your new two or three sentences here.',
```

### 4.2 Add a certification
In `content/site.js`, find `export const certs = [` and add one line:

```js
['Microsoft · SC-400', 'Information Protection Administrator'],
```

The first text is the small grey label, the second is the title.

### 4.3 Add a skill card or a skill tag
- New tag inside an existing card: add the name to that card's list, e.g. `'Defender XDR'`.
- New card: add a line to `skills`:

```js
['shield', 'AI Security', ['Copilot Security', 'Prompt safety']],
```

Allowed icon names: `cloud`, `shield`, `user`, `arch`, `layers`, `db`.

### 4.4 Add or change a featured project
In `content/site.js`, inside `export const projects = [ ... ]`, copy this block and edit it:

```js
{
  category: 'Cloud Security / Wiz',        // small label on the picture
  title: 'My New Project',
  text: 'Two sentences on what you delivered and the result.',
  tags: ['Wiz', 'Azure', 'Terraform'],     // chips under the text
  image: '/projects/my-new-project.jpg',   // picture on top
  href: 'https://example.com/case-study',  // optional: shows an arrow button. Use '' for none
},
```

**Use your own picture:** save a landscape image about 1200 x 560 px as `public/projects/my-new-project.jpg`, then use `/projects/my-new-project.jpg` as the `image` value. Without your own picture, reuse one of the supplied `.svg` covers in `public/projects/`.

To remove a project, delete its whole `{ ... },` block.

### 4.5 Add a job to Experience
In `experience` (newest first) add:

```js
{
  dates: 'Jan 2026 — Present', place: 'Noida', role: 'Your Role', company: 'Company',
  points: [
    'First achievement.',
    'Second achievement.',
  ],
},
```

### 4.6 Change the mentoring section
Everything is in `export const mentoring`: the headline, text, the four number cards (`stats`) and the "Worked at" chips (`workedAt`). The Topmate link comes from `profile.topmate`, so changing it once updates the hero icon, the contact card and the booking button.

> Only put numbers there that are true for you. The four defaults come from your own experience.

### 4.7 Replace my photo
Overwrite `public/profile.jpg` with your new photo (keep the name).
Best results: a **square or near-square portrait, at least 800 x 800 px**, face centred.
(Your original file is kept as `public/profile-original.jpg`. You can delete it.)

### 4.8 Change colours
The purple to blue to cyan gradient is defined in `app/sections.css`.
Search for `#a855f7` (purple), `#3b82f6` (blue) and `#22d3ee` (cyan) and replace them with your own hex colours. `.gt` is the gradient text, `.btn2.pri` is the gradient button. The older blue theme used by About, Skills and Experience is in `app/globals.css` (`:root{--b:#0096FF;--c:#00CDFF ...}`).

### 4.9 Add a link to the top menu
In `components/Nav.js`:

```js
['Blog', '/blog'],
['Podcast', 'https://example.com'],
```

### 4.10 Add a CV download
1. Put your PDF in `public/`, for example `public/Kedar-CV.pdf`.
2. In `content/site.js` set `cvUrl: '/Kedar-CV.pdf',` inside `profile`.

### 4.11 Add a new social icon (GitHub, YouTube...)
Social icons are in `socials` (`content/site.js`). Available icon names are: `linkedin`, `calendar`, `mail`, `phone`, `pin`. For another brand, add its icon path in `components/Icon.js`, inside `PATHS`, then use that name in `socials`. (Instagram was intentionally left out because you do not use it.)

---

## 5. The admin panel

Open **your-site.com/admin** and sign in with `ADMIN_PASSWORD`. Bookmark it. Nothing on the site links to it.

### Messages (from the "Get in Touch" form)
- New messages show a number badge on the tab and a purple outline.
- **Reply by email** opens your mail app addressed to the sender.
- **Mark as read / unread** and **Delete** keep the list tidy.
- Visitors never see these.

### Testimonials & comments
- Each testimonial shows name, role, company, rating, photo, private email and LinkedIn.
- Nothing is public until you press **Approve & publish**; it appears on the site within seconds.
- **Unpublish** hides it again. **Delete** removes it forever.
- Comments on blog posts also appear here, labelled with the post address.

### Blog posts
1. **Blog posts** tab, then **+ New post**.
2. Fill in Title, Content (Markdown), optional summary and tags.
3. **Preview** to check, set Status to **Published**, **Save post**.
4. Drafts stay hidden. You can edit or delete any post later.

Markdown cheat sheet:

```md
## Heading
**bold**  *italic*  `code`
- bullet one
- bullet two
1. numbered
[link text](https://example.com)
![image description](https://example.com/picture.png)
> quote
```

Code blocks go between lines containing three backticks.

---

## 6. Email alerts (optional, free)

Without this, everything still works and you simply check `/admin`. With it, you also get an email whenever someone sends a message or submits a testimonial. You can press **Reply** in your inbox and it goes straight to the visitor.

1. Create a free account at **resend.com** using the email where you want alerts (use your Gmail).
2. In Resend open **API Keys**, click **Create API Key**, and copy it.
3. Add the variables below.
   - Locally: in `.env.local`.
   - Live: Vercel project, **Settings, Environment Variables**, then **Redeploy**.

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
NOTIFY_EMAIL=kedarsahu09@gmail.com
```

4. Send yourself a test through the Get in Touch form.

Notes:
- Leave `NOTIFY_FROM` empty. The free test sender only delivers to the email you signed up with, which is exactly your case. (If you later verify your own domain in Resend, set `NOTIFY_FROM` to an address on it.) Resend's rules can change, so check their documentation if delivery fails.
- Check the **Spam** folder the first time.
- If sending ever fails, the visitor's message is **still saved** in the admin panel. Email can never break the form.
- The admin page shows a yellow note while email alerts are not configured.

---

## 7. First-time deployment (GitHub, Vercel, database)

### 7.1 Put the code on GitHub
Create an empty repository on github.com, then in the VS Code terminal:

```bash
git init
git add .
git commit -m "Portfolio site"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

`.env.local` is ignored by Git, so your passwords are never uploaded.

### 7.2 Publish on Vercel
1. vercel.com, **Add New, Project**, import the GitHub repository, **Deploy**.
2. **Database:** in the project open **Storage** (or the Marketplace), add **Upstash Redis** (free plan) and connect it to this project. This adds its connection variables automatically. The code accepts either `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` or `KV_REST_API_URL` / `KV_REST_API_TOKEN`.
3. **Settings, Environment Variables**, add `ADMIN_PASSWORD`, `ADMIN_SECRET`, `NEXT_PUBLIC_SITE_URL` (your live address), and optionally the email variables from section 6.
4. **Deployments**, then **Redeploy** the latest one so the new variables are picked up.

From now on every `git push` publishes automatically.

> Why a database? Vercel cannot save files while the site runs, so messages, testimonials and blog posts are stored in Upstash Redis.

### 7.3 Updating this version over your old one
If you already have the first version live: replace your project files with these, keep your existing Vercel environment variables, and run:

```bash
npm install
git add .
git commit -m "Round 2: new design, messages, testimonials"
git push
```

Comments already approved on the old version keep working: they show as testimonials without a rating.

---

## 8. Environment variables

| Name | Required? | What it does |
|---|---|---|
| `ADMIN_PASSWORD` | Yes | Password for `/admin` |
| `ADMIN_SECRET` | Yes | Random text used to sign your login cookie |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` (or `KV_REST_API_URL`, `KV_REST_API_TOKEN`) | Yes, on Vercel | Database connection (added by the Upstash integration) |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Your live address, used for link previews, sitemap and links inside alert emails |
| `RESEND_API_KEY` | Optional | Turns on email alerts |
| `NOTIFY_EMAIL` | Optional | Where alerts go (default: the email in `content/site.js`) |
| `NOTIFY_FROM` | Optional | Sender shown on alerts (default: Resend test sender) |

After changing a variable on Vercel you must **redeploy**.

---

## 9. Troubleshooting

| Problem | Fix |
|---|---|
| `npm: command not found` | Install Node.js, then reopen VS Code |
| Page shows a red error after I edited `content/site.js` | A quote or comma is missing. Undo with Ctrl + Z, or `git checkout -- content/site.js` |
| `Port 3000 is already in use` | Stop the other server with Ctrl + C, or run `npm run dev -- -p 3001` |
| My change does not show on the live site | Did you `git push`? Check Vercel, **Deployments**, for a red (failed) build and open its log |
| `/admin` says wrong password | Check `ADMIN_PASSWORD` on Vercel, then redeploy. Locally check `.env.local` and restart `npm run dev` |
| Admin shows "No database connected" | Connect Upstash Redis in Vercel (section 7.2), then redeploy |
| Messages and testimonials vanish locally | Normal without a database. They persist on the live site |
| No alert emails | Check section 6: key set? redeployed? Spam folder? Messages are always in `/admin` regardless |
| Testimonial approved but not visible | Wait up to a minute and refresh. The page refreshes itself when you approve |
| Build fails on Vercel with a red message | Open the build log and read the first red line. Pasting it to an AI assistant is a quick way to decode it |

---

## 10. Project map

```
content/site.js          <- ALL your text and numbers (edit this most)
public/profile.jpg       <- your photo
public/projects/         <- project pictures
app/page.js              <- the home page layout (order of sections)
app/sections.css         <- styles for hero, projects, mentoring, testimonials, contact
app/globals.css          <- base styles for About, Skills, Experience, Certifications
app/layout.js            <- site title and page description
app/blog/                <- blog list and post pages
app/admin/               <- admin page (UI in components/AdminApp.js)
app/api/contact/         <- receives contact form messages
app/api/comments/        <- receives testimonials and blog comments
app/api/admin/           <- private: login, messages, comments, posts
components/              <- reusable parts (Nav, Testimonials, forms...)
lib/store.js             <- database (Upstash Redis; memory fallback for local use)
lib/notify.js            <- email alerts
lib/auth.js              <- admin login
```

**Built-in protections:** forms are rate-limited (5 per hour per visitor) and have a hidden bot trap; everything visitors type is shown as plain text so scripts cannot run; testimonials need your approval; visitor emails are never shown publicly; the admin login is rate-limited and uses a signed, HTTP-only cookie that expires after 12 hours.
