const { JobApplications } = require('./jobApplications.class');
const createModel = require('../../models/jobApplications.model');
const hooks = require('./jobApplications.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/jobApplications', new JobApplications(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('jobApplications');

  service.hooks(hooks);
};