const assert = require('assert');
const app = require('../../src/app');

describe('\'scholarships\' service', () => {
  it('registered the service', () => {
    const service = app.service('scholarships');

    assert.ok(service, 'Registered the service (scholarships)');
  });
});
