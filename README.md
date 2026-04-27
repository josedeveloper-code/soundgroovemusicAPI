# Sound Groove Music API

**Creator:** Jose Corril

**Description:** Project for Rize

## Project Structure

```
soundgroovemusicAPI/
├── models/
│   ├── index.js
│   ├── User.js
│   ├── Artist.js
│   └── Track.js
├── routes/
│   ├── authroutes.js
│   ├── trackroutes.js
│   └── publicroutes.js
├── app.js
├── server.js
└── database.js
```

## Deployment Notes

- Render must use `npm start` as the start command.
- Do not use `node start`.
- The project includes `render.yaml` to enforce `npm install` and `npm start`.
- Node version is pinned via `.nvmrc` and `package.json` engines to `24.14.1`.
- Make sure Render environment variables include:
  - `DATABASE_URL`
  - `JWT_SECRET`
  - `FRONTEND_URL` (if your frontend is on a different domain)

## Render Deploy Checklist

1. Confirm `render.yaml` is committed to the repo root.
2. Confirm Render service uses `npm start` as its start command.
3. Confirm `nodeVersion: 24.14.1` is set in `render.yaml`.
4. Confirm the Render environment variables are configured:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `FRONTEND_URL` (optional)
5. Confirm the service is pointing to the correct Git branch.

**Creator:** Jose Corril

**Ownership and the Creator of the App Sound Groove Music API**

--- This is the project for Rize -------------------------

/*

soundgroovemusicAPI/
├── models/
│   ├── index.js      <-- This is the "model" it's looking for
│   ├── User.js
│   ├── Artist.js
│   └── Track.js      (Sequelize version)
├── routes/
│   ├── authroutes.js  <-- This is the "route" it's looking for
│   ├── trackroutes.js
│   └── publicroutes.js
├── app.js
├── server.js
└── database.js
