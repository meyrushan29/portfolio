# Meyrushan Nadarajan — Portfolio

React + Vite + Tailwind portfolio, deployed on Vercel.

```bash
npm install
npm run dev
```

## Project admin (`/admin`)

Projects are managed from `/admin` and stored in [Supabase](https://supabase.com). Until Supabase is set up (or while its table is empty) the site shows the built-in projects from `src/constants/index.js`.

### One-time setup

1. Create a free Supabase project.
2. In **SQL Editor**, run [`supabase/schema.sql`](supabase/schema.sql). It creates the `projects` table, the public `project-media` storage bucket, and rules that let only `meyrushan29@gmail.com` make changes.
3. In **Authentication > Users**, click **Add user > Create new user** with that email and a strong password (tick *Auto Confirm User*).
4. In **Authentication > Sign In / Providers**, turn off **Allow new users to sign up**.
5. Copy `.env.example` to `.env.local` and fill in the URL and anon key from **Project Settings > API**.
6. In Vercel, add the same two variables under **Settings > Environment Variables**, then redeploy.
7. Open `/admin`, sign in, and click **Import current projects** to copy the built-in projects (with their screenshots and video) into the database.

After that, adding, editing, reordering or deleting a project in `/admin` updates the live site immediately — no redeploy needed.
