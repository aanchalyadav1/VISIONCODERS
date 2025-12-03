# ALIS Backend - README

## Setup (local)
1. Copy `.env.example` to `.env` and fill values:
   - GROQ_API_KEY
   - FIREBASE_PROJECT_ID
   - FIREBASE_STORAGE_BUCKET (e.g. visioncoders-a4b62.appspot.com)
   - GOOGLE_APPLICATION_CREDENTIALS (path to service account JSON)
2. Place VisionCoders logo at `backend/assets/logo.png`.
3. Install:
   ```
   cd backend
   npm install
   ```
4. Start:
   ```
   npm run dev
   # or
   npm start
   ```

## Firebase Admin credentials
- Create a service account from Firebase Console → Project Settings → Service accounts → Generate new key.
- Download the JSON and set environment variable `GOOGLE_APPLICATION_CREDENTIALS` to point to that file path.
- On Render, store this JSON as a secret file or convert to env var and write a small loader.

## Endpoints
- POST /api/chat { message, sessionId, user }
- POST /api/upload-salary multipart/form-data file
- POST /api/sanction { name, amount, interest, tenure, refId }
- POST /auth/verify { idToken }   (verifies Firebase ID token)
- GET /api/admin/stats

## Deployment (Render)
1. Push repo to GitHub.
2. Create a Render Web Service, point to `backend` folder.
3. Build command: `npm install`
4. Start command: `node server.js`
5. Add env vars in Render: GROQ_API_KEY, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, GOOGLE_APPLICATION_CREDENTIALS (or provide service account differently).
6. Ensure CORS origin is set to your frontend URL in `server.js`.

