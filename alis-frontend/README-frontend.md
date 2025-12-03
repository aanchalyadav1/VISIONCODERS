# ALIS Frontend - Vite + React + Tailwind + Firebase

## Setup (local)
1. Copy `.env.example` to `.env` and fill values (Vite env variables start with VITE_):
   - VITE_API_BASE=http://localhost:4000
   - VITE_FIREBASE_API_KEY=REPLACE_ME
   - VITE_FIREBASE_AUTH_DOMAIN=REPLACE_ME
   - VITE_FIREBASE_PROJECT_ID=visioncoders-a4b62
   - VITE_FIREBASE_STORAGE_BUCKET=visioncoders-a4b62.appspot.com
   - VITE_FIREBASE_MESSAGING_SENDER_ID=REPLACE_ME
   - VITE_FIREBASE_APP_ID=REPLACE_ME

2. Install dependencies:
   ```
   npm install
   ```

3. Run dev server:
   ```
   npm run dev
   ```

4. Build for production:
   ```
   npm run build
   ```

## Notes
- Replace Firebase config values in `src/firebase.js` or provide Vite env variables.
- Ensure backend URL (VITE_API_BASE) points to your deployed backend (Render).
- The `public/team_logo.png` file contains your VisionCoders logo used in the UI and sanction PDF.

