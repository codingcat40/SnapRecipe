# SnapRecipe — MVP

Scan any food photo → get full recipe + macros instantly. Powered by Gemini Flash via OpenRouter.

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.local.example .env.local
```

Open `.env.local` and add your OpenRouter API key:
```
OPENROUTER_API_KEY=your_key_here
```

Get a free key at → https://openrouter.ai/keys  
Gemini Flash is free on OpenRouter with generous limits.

### 3. Run locally
```bash
npm run dev
```

Open http://localhost:3000

---

## Project Structure

```
src/
├── app/
│   ├── api/scan/route.ts   ← Server-side API route (key stays secret here)
│   ├── layout.tsx
│   ├── page.tsx            ← Main page
│   └── globals.css
├── components/
│   ├── Navbar.tsx
│   ├── UploadZone.tsx      ← Drag & drop image upload
│   ├── RecipeCard.tsx      ← Recipe result display
│   └── MacroStrip.tsx      ← Calories / protein / carbs / fat
└── lib/
    ├── types.ts            ← TypeScript interfaces
    └── prompt.ts           ← The Gemini AI prompt
```

## Deploy to Vercel

```bash
npx vercel
```

Add `OPENROUTER_API_KEY` in Vercel → Project → Settings → Environment Variables.

---

## Next steps (after MVP validation)

- [ ] Add Supabase auth (sign in with Google)
- [ ] Track free tier usage (5 scans/month limit)
- [ ] Add Stripe for Pro plan ($9.99/mo)
- [ ] Save recipe library for logged-in users
- [ ] Serving size scaler
- [ ] Grocery list export
