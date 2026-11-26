# test-repo

A small Express.js REST API used for experimenting with the coding agent integration.

## Getting started

```bash
npm install
npm start        # runs on http://localhost:3000
npm test         # runs the Jest + Supertest suite
```

## Endpoints

| Method | Path              | Description                              |
|--------|-------------------|------------------------------------------|
| GET    | /health           | Health check                             |
| GET    | /api/tasks        | List tasks (optional `?status=` filter)  |
| POST   | /api/tasks        | Create a task (`title` required)         |
| GET    | /api/tasks/:id    | Get a task by id                         |
| PATCH  | /api/tasks/:id    | Update `title`, `description`, `status`  |
| DELETE | /api/tasks/:id    | Delete a task                            |

Valid statuses are `todo`, `in_progress`, and `done`.

Updated by NightKeeper.
