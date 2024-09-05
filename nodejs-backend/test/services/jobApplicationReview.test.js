const assert = require('assert');
const app = require('../../src/app');

describe('\'jobApplicationReview\' service', () => {
  it('registered the service', () => {
    const service = app.service('jobApplicationReview');

    assert.ok(service, 'Registered the service (jobApplicationReview)');
  });
});
