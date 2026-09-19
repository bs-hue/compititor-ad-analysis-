# 🚀 Multi-Client Competitor Intelligence & Ad Swipe Engine — Setup Guide

This guide walks you through setting up both **Local Zero-Config Mode** and **Supabase Cloud PostgreSQL Database** for persistent multi-client tracking.

---

## 1. What to Put in Your `.env` File

Open the `.env` file in the `Dashboard/` folder (or create it from `.env.example`):

```env
# 1. Server Port (Default is 3000)
PORT=3000

# 2. Supabase Project URL
SUPABASE_URL=https://your-project-ref.supabase.co

# 3. Supabase Anon Public Key
SUPABASE_ANON_KEY=your-anon-public-key-here
```

### 📍 Where to find your Supabase credentials:
1. Log in to [Supabase Dashboard](https://supabase.com/dashboard).
2. Open your project (or create a new free project).
3. Click the **Project Settings** (gear icon) in the bottom-left sidebar.
4. Navigate to **API** in the menu.
5. Copy the following:
   - **Project URL** → Paste into `SUPABASE_URL`
   - **Project API keys** > `anon` `public` key → Paste into `SUPABASE_ANON_KEY`

> **Note:** If you leave the placeholder values in `.env`, the app automatically runs in **Fast Local Memory Mode** with all default clients and seed ads.

---

## 2. Setting Up the Database Tables in Supabase

Run the schema script to automatically create all tables, indexes, cascading foreign keys, and seed data:

1. Open your Supabase Project Dashboard.
2. In the left sidebar, click **SQL Editor** (`>_`).
3. Click **New Query**.
4. Open the file [`database/schema.sql`](file:///d:/may%20june%20July%202026/July/Digital-Scholar-Competitor-Intelligence-2026-04-27%20%281%29/Digital-Scholar-Competitor-Intelligence-2026-04-27/Dashboard/database/schema.sql) in this repository and copy the entire content.
5. Paste it into the Supabase SQL Editor and click **Run** (or press `Ctrl + Enter`).

### Tables Created:
- **`clients`**: Stores client workspaces (`Master Kundli Report`, `Gemsguruji`, `Smart Kundli`).
- **`competitors`**: Stores competitor brands, live Meta Ad Library URLs, active ad volume, and longevity tiers.
- **`swipe_data`**: Stores tracked ad creatives, hero hooks, copy, marketing angles, and days active.

---

## 3. Starting the Application

Run the server with Node:

```bash
npm start
```

Or for development:
```bash
npm run dev
```

The application will be accessible at:
- **Web Dashboard**: [http://localhost:3000](http://localhost:3000) (or `http://localhost:3000/Swipe-Dashboard.html`)
- **API Health Check**: [http://localhost:3000/api/health](http://localhost:3000/api/health)
- **Clients API**: [http://localhost:3000/api/clients](http://localhost:3000/api/clients)

---

## 4. Architecture Overview

```text
Dashboard/
├── .env.example             # Clean environment variables template
├── .env                     # Your local credentials
├── database/
│   └── schema.sql           # PostgreSQL table schema & seed data
├── src/
│   ├── config/
│   │   └── supabase.js      # Supabase connection & health checking
│   ├── data/
│   │   └── seedData.js      # Multi-client seed dataset
│   ├── services/
│   │   └── dbService.js     # Unified database service (Supabase + In-memory fallback)
│   ├── controllers/
│   │   ├── clientController.js
│   │   ├── competitorController.js
│   │   └── adController.js
│   └── routes/
│       └── api.js           # REST API endpoints
├── server.js                # Modular Express server entry point
├── Swipe-Dashboard.html     # High-end SaaS dashboard UI
└── index.html               # Root redirector
```
