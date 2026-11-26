const express = require('express');
const tasksRouter = require('./routes/tasks');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

const healthCheck = (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
};

app.get('/health', healthCheck);
app.get('/api/health', healthCheck);

app.use('/api/tasks', tasksRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
