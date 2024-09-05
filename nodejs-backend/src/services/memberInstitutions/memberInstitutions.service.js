const { MemberInstitutions } = require('./memberInstitutions.class');
const createModel = require('../../models/memberInstitutions.model');
const hooks = require('./memberInstitutions.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/memberInstitutions', new MemberInstitutions(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('memberInstitutions');

  service.hooks(hooks);
};