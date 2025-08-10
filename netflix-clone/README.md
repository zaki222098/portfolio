# Netflix Clone (React + Vite)

A simplified Netflix-style UI built with React and TypeScript.

## Getting started

1. Install dependencies:

```bash
npm install
```

2. (Optional) Create `.env` in the project root with your TMDB API key to use live data:

```bash
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

3. Run the dev server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build && npm run preview
```

## Notes

- If no `VITE_TMDB_API_KEY` is provided, the app falls back to a small mock dataset so the UI still renders.
- Image URLs use TMDB's image CDN.
- This is a UI/learning project and not affiliated with Netflix.
