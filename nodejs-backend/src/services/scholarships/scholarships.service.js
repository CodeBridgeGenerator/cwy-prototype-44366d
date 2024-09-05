const { Scholarships } = require('./scholarships.class');
const createModel = require('../../models/scholarships.model');
const hooks = require('./scholarships.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/scholarships', new Scholarships(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('scholarships');

  service.hooks(hooks);
};