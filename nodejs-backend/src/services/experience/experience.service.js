const { Experience } = require('./experience.class');
const createModel = require('../../models/experience.model');
const hooks = require('./experience.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/experience', new Experience(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('experience');

  service.hooks(hooks);
};