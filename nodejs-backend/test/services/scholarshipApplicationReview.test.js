const assert = require('assert');
const app = require('../../src/app');

describe('\'scholarshipApplicationReview\' service', () => {
  it('registered the service', () => {
    const service = app.service('scholarshipApplicationReview');

    assert.ok(service, 'Registered the service (scholarshipApplicationReview)');
  });
});
