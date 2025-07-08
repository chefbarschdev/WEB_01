# Notion Integration Guide

This guide explains how to capture form submissions in a Notion database before moving to a full Supabase setup. It complements `WAITLIST_SETUP_GUIDE.md` and provides a lightweight way to start collecting data.

## Plan Overview

1. **Add Notion Integration** – Use a Notion database to store entries from the waitlist and contact forms.
2. **Wire the Forms** – Update `WaitlistMachine` and `ContactForm` to post to a new backend endpoint that writes to Notion.
3. **Migrate to Supabase** – When ready, disable the Notion endpoint and follow `WAITLIST_SETUP_GUIDE.md` to store data in Supabase.

## Step 1: Create the Notion Database ✅

1. Log in to Notion and create a **Table** database.
2. Name it `Waitlist` or `ContactForm` depending on your needs.
3. Add these properties (names must match exactly):
   - `Name` _(Title, required)_
   - `Email` _(Email, required)_
   - `Message` _(Text, optional)_
   - `Timestamp` _(Created Time, optional)_

## Step 2: Set Up the Integration ✅

1. Go to **Settings → Integrations** in Notion.
2. Create a new integration, e.g. **WaitlistBot**.
3. Copy the integration token—it starts with `secret_`.
4. Share your database with the integration:
   - Open the database page.
   - Click **Share → Invite**.
   - Select your integration and give it **Can edit** access.

## Step 3: Get the Database ID ✅

1. Open the database as a full page.
2. The URL looks like `https://www.notion.so/workspace/Name-<database_id>`.
3. Copy the `<database_id>` (32 characters, no hyphens).

## Step 4: Configure Environment Variables ⚙️

Add these variables to your `.env.local` file:

```env
NOTION_TOKEN=secret_your_token_here
NOTION_DB_ID=your_database_id_here
```

## Step 5: Create the Backend Endpoint ⚙️

Implement an API route (e.g. `src/routes/api/notion-contact/index.ts`) that uses the Notion SDK to append form data to your database. Use the environment variables above for authentication.

Example outline:

```ts
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export const onRequestPost = async ({ request }) => {
  const data = await request.json();
  await notion.pages.create({
    parent: { database_id: process.env.NOTION_DB_ID! },
    properties: {
      Name: { title: [{ text: { content: data.name } }] },
      Email: { email: data.email },
      Message: { rich_text: [{ text: { content: data.message || '' } }] },
    },
  });
  return new Response(JSON.stringify({ ok: true }));
};
```

## Step 6: Wire the Forms ⚙️

Update `WaitlistMachine.tsx` and `ContactForm.tsx` so their submit handlers `POST` to this new endpoint. Handle success and error states to give users feedback.

## Step 7: Migrate to Supabase ➡️

Once the Notion flow works, switch the forms to `/api/join-waitlist` and follow `WAITLIST_SETUP_GUIDE.md` to use Supabase as your primary database.

---

**Current Status:** Notion setup pending

**Next Action:** Create the Notion database and integration, then implement the backend endpoint.
