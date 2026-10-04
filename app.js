const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Jenkins CI/CD pipeline!', version: '1.0.0' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

module.exports = app;
