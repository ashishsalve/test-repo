const request = require('supertest');
const app = require('../src/app');
const store = require('../src/store/taskStore');

describe('test-repo API', () => {
  beforeEach(() => store.reset());

  test('GET /health returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('GET /api/health returns ok with uptime', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(typeof res.body.uptime).toBe('number');
  });

  test('GET /api/tasks lists seeded tasks', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.status).toBe(200);
    expect(res.body.count).toBe(res.body.data.length);
    expect(res.body.count).toBeGreaterThan(0);
  });

  test('GET /api/tasks filters by status', async () => {
    const res = await request(app).get('/api/tasks?status=done');
    expect(res.status).toBe(200);
    res.body.data.forEach((t) => expect(t.status).toBe('done'));
  });

  test('POST /api/tasks creates a task with trimmed title', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: '  Write tests  ' });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Write tests');
    expect(res.body.status).toBe('todo');
  });

  test('POST /api/tasks rejects a missing title', async () => {
    const res = await request(app).post('/api/tasks').send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('title is required');
  });

  test('GET /api/tasks/:id returns 404 for unknown id', async () => {
    const res = await request(app).get('/api/tasks/999');
    expect(res.status).toBe(404);
  });

  test('GET /api/tasks/:id rejects a non-numeric id', async () => {
    const res = await request(app).get('/api/tasks/abc');
    expect(res.status).toBe(400);
  });

  test('PATCH /api/tasks/:id updates status', async () => {
    const id = store.list()[0].id;
    const res = await request(app)
      .patch(`/api/tasks/${id}`)
      .send({ status: 'in_progress' });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('in_progress');
  });

  test('PATCH /api/tasks/:id rejects an invalid status', async () => {
    const id = store.list()[0].id;
    const res = await request(app)
      .patch(`/api/tasks/${id}`)
      .send({ status: 'archived' });
    expect(res.status).toBe(400);
  });

  test('DELETE /api/tasks/:id removes the task', async () => {
    const id = store.list()[0].id;
    const del = await request(app).delete(`/api/tasks/${id}`);
    expect(del.status).toBe(204);

    const get = await request(app).get(`/api/tasks/${id}`);
    expect(get.status).toBe(404);
  });

  test('unknown routes return a JSON 404', async () => {
    const res = await request(app).get('/does-not-exist');
    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/Route not found/);
  });
});
