const assert = require('assert');
const app = require('../../src/app');

describe('\'admins\' service', () => {
  it('registered the service', () => {
    const service = app.service('admins');

    assert.ok(service, 'Registered the service (admins)');
  });
});
