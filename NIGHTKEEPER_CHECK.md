# NIGHTKEEPER_CHECK

A small Express.js (Node >= 18) REST API for managing tasks, backed by an in-memory store (`src/store/taskStore.js`).
Endpoints: `GET /health` plus CRUD on `/api/tasks` (list with `?status=`, create, get, PATCH update, delete).
Code layout: `src/app.js` (app setup), `src/server.js` (entry point), `src/routes`, `src/controllers`, `src/middleware`.
Install: `npm install`
Run: `npm start` (listens on http://localhost:3000, override with `PORT`); `npm run dev` for nodemon auto-reload.
Test: `npm test` (Jest + Supertest suite in `tests/`); CI runs the same on Node 20 via GitHub Actions.
