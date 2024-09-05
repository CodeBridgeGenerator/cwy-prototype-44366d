const { Institutions } = require('./institutions.class');
const createModel = require('../../models/institutions.model');
const hooks = require('./institutions.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/institutions', new Institutions(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('institutions');

  service.hooks(hooks);
};