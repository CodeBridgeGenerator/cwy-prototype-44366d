const assert = require('assert');
const app = require('../../src/app');

describe('\'memberProfile\' service', () => {
  it('registered the service', () => {
    const service = app.service('memberProfile');

    assert.ok(service, 'Registered the service (memberProfile)');
  });
});
