const assert = require('assert');
const app = require('../../src/app');

describe('\'memberInstitutions\' service', () => {
  it('registered the service', () => {
    const service = app.service('memberInstitutions');

    assert.ok(service, 'Registered the service (memberInstitutions)');
  });
});
