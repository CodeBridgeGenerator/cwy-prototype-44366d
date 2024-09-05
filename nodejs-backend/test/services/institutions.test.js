const assert = require('assert');
const app = require('../../src/app');

describe('\'institutions\' service', () => {
  it('registered the service', () => {
    const service = app.service('institutions');

    assert.ok(service, 'Registered the service (institutions)');
  });
});
