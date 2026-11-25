// In-memory store. Data resets whenever the process restarts.
const seed = () => {
  const now = new Date().toISOString();
  return [
    {
      id: 1,
      title: 'Set up project',
      description: 'Initialize the repository and install dependencies',
      status: 'done',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 2,
      title: 'Design task API',
      description: 'Define endpoints and request/response payloads',
      status: 'in_progress',
      createdAt: now,
      updatedAt: now,
    },
  ];
};

let tasks = seed();
let nextId = 3;

function list() {
  return [...tasks];
}

function findById(id) {
  return tasks.find((t) => t.id === id) || null;
}

function create({ title, description = '' }) {
  const now = new Date().toISOString();
  const task = {
    id: nextId++,
    title,
    description,
    status: 'todo',
    createdAt: now,
    updatedAt: now,
  };
  tasks.push(task);
  return { ...task };
}

function update(id, changes) {
  const task = findById(id);
  if (!task) return null;
  Object.assign(task, changes, { updatedAt: new Date().toISOString() });
  return { ...task };
}

function remove(id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}

function reset() {
  tasks = seed();
  nextId = 3;
}

module.exports = { list, findById, create, update, remove, reset };
