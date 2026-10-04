const test = require('node:test');
const assert = require('node:assert');
const app = require('../app');

let server;
let baseUrl;

test.before(() => {
  server = app.listen(0);
  baseUrl = `http://localhost:${server.address().port}`;
});

test.after(() => server.close());

test('GET / returns hello message', async () => {
  const res = await fetch(baseUrl + '/');
  const body = await res.json();
  assert.strictEqual(res.status, 200);
  assert.match(body.message, /Hello/);
});

test('GET /health returns UP', async () => {
  const res = await fetch(baseUrl + '/health');
  const body = await res.json();
  assert.strictEqual(body.status, 'UP');
});
