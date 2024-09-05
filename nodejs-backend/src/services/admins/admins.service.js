const { Admins } = require('./admins.class');
const createModel = require('../../models/admins.model');
const hooks = require('./admins.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/admins', new Admins(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('admins');

  service.hooks(hooks);
};