const store = require('../store/taskStore');
const { HttpError } = require('../middleware/errorHandler');

const VALID_STATUSES = ['todo', 'in_progress', 'done'];

function parseId(raw) {
  const id = Number(raw);
  if (!Number.isInteger(id) || id <= 0) {
    throw new HttpError(400, 'Task id must be a positive integer');
  }
  return id;
}

function listTasks(req, res) {
  const { status } = req.query;
  let items = store.list();
  if (status) {
    items = items.filter((t) => t.status === status);
  }
  res.json({ data: items, count: items.length });
}

function createTask(req, res) {
  const { title, description } = req.body || {};
  if (typeof title !== 'string' || !title.trim()) {
    throw new HttpError(400, 'title is required');
  }
  const task = store.create({
    title: title.trim(),
    description: typeof description === 'string' ? description : '',
  });
  res.status(201).json(task);
}

function getTask(req, res) {
  const task = store.findById(parseId(req.params.id));
  if (!task) throw new HttpError(404, 'Task not found');
  res.json(task);
}

function updateTask(req, res) {
  const id = parseId(req.params.id);
  if (!store.findById(id)) throw new HttpError(404, 'Task not found');

  const changes = {};
  const { title, description, status } = req.body || {};

  if (title !== undefined) {
    if (typeof title !== 'string' || !title.trim()) {
      throw new HttpError(400, 'title must be a non-empty string');
    }
    changes.title = title.trim();
  }
  if (description !== undefined) {
    if (typeof description !== 'string') {
      throw new HttpError(400, 'description must be a string');
    }
    changes.description = description;
  }
  if (status !== undefined) {
    if (!VALID_STATUSES.includes(status)) {
      throw new HttpError(400, `status must be one of: ${VALID_STATUSES.join(', ')}`);
    }
    changes.status = status;
  }

  res.json(store.update(id, changes));
}

function deleteTask(req, res) {
  const removed = store.remove(parseId(req.params.id));
  if (!removed) throw new HttpError(404, 'Task not found');
  res.status(204).end();
}

module.exports = { listTasks, createTask, getTask, updateTask, deleteTask };
