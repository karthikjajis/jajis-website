# Jaji's website

Frontend for www.jajisinnovation.com — React 18 + Vite + Tailwind CSS 4, hosted on Vercel.

```bash
npm install
npm run dev      # local preview
npm run build    # production build into dist/
```

The API address comes from `VITE_API_URL` (set in Vercel). If it's missing, the Supabase API is used:
`https://tbkvtcuqszgmahzswspe.supabase.co/functions/v1/api/`

Design: black & white editorial style, one font (Jost, self-hosted via `@fontsource-variable/jost`).
Pages are loaded on demand (`React.lazy`) and images live in `src/assets/img` as compressed WebP.
