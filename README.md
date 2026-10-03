# Developer Resource Hub

A simple, responsive dashboard for discovering useful developer tools, websites and tutorials.

## Recruitment Task
Built for the **GDGoC AITR Web Developer Recruitment 2026** — Section B, **Task 3: Developer Resource Hub**.

The task asks for:
- Resource cards grouped by Web Dev, App Dev, AI/ML and Tools
- Live search and category filtering without a page refresh
- A form to add resources
- Data that persists after refresh
- Bonus: upvotes
- Bonus: dark/light mode
- A public GitHub repository with a clear README and working live URL
- Section A portal review/audit

## Features implemented

### 1. Resource cards
Each resource contains:
- Title
- Category
- Description
- Working external link
- Upvote count

### 2. Live search
Typing in the search box filters resources immediately without reloading the page.

### 3. Category filter
Resources can be filtered by:
- Web Dev
- App Dev
- AI/ML
- Tools

### 4. Add Resource
Users can add a new resource using:
- Title
- Category
- Description
- URL

The URL is validated to allow only `http` and `https` links.

### 5. Browser persistence
Resources are stored in `localStorage`, so added resources and upvotes remain after a page refresh in the same browser.

### 6. Bonus features
- Upvote button
- Dark/light mode toggle
- Responsive mobile layout
- Safe HTML rendering for user-entered content

## Tech stack

- HTML5
- CSS3
- Vanilla JavaScript
- Browser `localStorage`

No backend or external database is required.

## How to run locally

1. Download or clone the repository.
2. Open `index.html` in a browser.
3. Search, filter, add resources and test the theme/upvote features.

For development, you can also use a simple local server such as VS Code Live Server.

## Project structure

```text
Developer-Resource-Hub/
├── index.html
├── style.css
├── script.js
├── AUDIT.md
└── README.md
```

## Interview explanation

**Problem:** Developers often have useful resources spread across many websites. This project puts them into one searchable dashboard.

**Frontend:** I used HTML for structure, CSS for responsive design, and JavaScript for all interactions.

**Search/filter:** JavaScript listens for input changes and filters the resource array in real time, so there is no page reload.

**Persistence:** I used browser `localStorage` because this is a small recruitment project and does not need a backend. Data is converted to JSON before storage and parsed again when the page loads.

**Security/basic validation:** User text is escaped before being inserted into the page, and submitted links are checked so only HTTP/HTTPS URLs are accepted.

**Bonus:** I added upvotes and a dark/light mode toggle. Both update the UI and use `localStorage` where persistence is needed.

## Live Demo

**Production URL:** https://developer-resource-hub-mauve.vercel.app/

The live deployment is hosted on Vercel.

## Submission checklist

- [ ] Push all files to a **public GitHub repository**.
- [ ] Confirm the repository opens without requesting permission.
- [ ] Deploy the project and test the live URL.
- [ ] Add the live URL to this README.
- [ ] Complete `AUDIT.md` after manually checking the GDG AITR portal on desktop and mobile.
- [ ] Test search, category filter, add resource, refresh persistence, upvote and dark/light mode on the live site.
- [ ] Be ready to explain every JavaScript function during the interview.
every JavaScript function during the interview.
