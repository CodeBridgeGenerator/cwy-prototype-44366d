const { MemberProfile } = require('./memberProfile.class');
const createModel = require('../../models/memberProfile.model');
const hooks = require('./memberProfile.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/memberProfile', new MemberProfile(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('memberProfile');

  service.hooks(hooks);
};