const assert = require('assert');
const app = require('../../src/app');

describe('\'scholarshipApplications\' service', () => {
  it('registered the service', () => {
    const service = app.service('scholarshipApplications');

    assert.ok(service, 'Registered the service (scholarshipApplications)');
  });
});
