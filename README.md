# GreetCard

A web app that lets users personalise and share greeting card templates for occasions like birthdays, anniversaries, festivals, weddings, and more. Users can overlay their profile photo and name onto beautifully designed templates, customise the background, and share the final card via WhatsApp, email, or direct download.

Public Github link: https://github.com/KNsreeja07/greetcard

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [How It Works](#how-it-works)
- [Challenges & Solutions](#challenges--solutions)
- [Future Improvements](#future-improvements)

---

## Features

- Auth flow — email, Google (via Supabase), or guest access
- Browse greeting templates by category (Birthday, Anniversary, Festival, Wedding, Congratulations, New Year)
- Overlay your profile photo and name onto any template
- Replace the template background with your own image
- Share the composed card via native share, WhatsApp, email, or clipboard copy
- Download the final card as a JPEG
- Premium template gating with a Pro upgrade popup
- Persistent user profile via localStorage

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Icons | Lucide React |
| Image Composition | Browser Canvas API |
| Package Manager | npm |

---

## Project Structure

```
project/
├── public/
├── src/
│   ├── components/
│   │   ├── AuthPage.tsx          # Login / sign-up / guest entry
│   │   ├── ProfileSetup.tsx      # First-time name & photo setup
│   │   ├── HomePage.tsx          # Template grid with category filter
│   │   ├── TemplateCard.tsx      # Individual template preview card
│   │   ├── ImageEditor.tsx       # Full editor — photo, name, background
│   │   ├── ShareModal.tsx        # Share / download modal
│   │   └── PremiumPopup.tsx      # Upgrade prompt for locked templates
│   ├── data/
│   │   └── templates.ts          # All template definitions (id, image, positions, etc.)
│   ├── utils/
│   │   ├── auth.ts               # UserProfile type, localStorage helpers
│   │   └── imageComposer.ts      # Canvas-based image composition logic
│   ├── App.tsx                   # Root screen router (auth → setup → home)
│   ├── main.tsx                  # React entry point
│   └── index.css                 # Tailwind base import
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── tsconfig.app.json
└── package.json
```

---

## Prerequisites

Make sure you have the following installed:

- **Node.js** v18 or higher — [download](https://nodejs.org)
- **npm** v9 or higher (comes with Node)

Verify your versions:

```bash
node -v
npm -v
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/KNSreeja07/greetcard.git
cd greetcard
```

### 2. Install dependencies

```bash
npm install
```


### 3. Start the development server

```bash
npm run dev
```

The app will be running at **http://localhost:5173**

---


