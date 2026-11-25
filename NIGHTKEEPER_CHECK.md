# NIGHTKEEPER_CHECK

Small Express.js (Node >= 18) REST API for managing tasks, held in an in-memory store that resets on restart.
Code: `src/app.js` (app, `/health`), `src/routes` + `src/controllers` (`/api/tasks` CRUD), `src/store`, `src/middleware`.
Task statuses are `todo`, `in_progress` and `done`. Tests: Jest + Supertest in `tests/`, run by GitHub Actions CI.
Install: `npm install`
Run: `npm start` (listens on http://localhost:3000, override with `PORT`) or `npm run dev` (nodemon)
Test: `npm test`
