const assert = require('assert');
const app = require('../../src/app');

describe('\'jobApplications\' service', () => {
  it('registered the service', () => {
    const service = app.service('jobApplications');

    assert.ok(service, 'Registered the service (jobApplications)');
  });
});
