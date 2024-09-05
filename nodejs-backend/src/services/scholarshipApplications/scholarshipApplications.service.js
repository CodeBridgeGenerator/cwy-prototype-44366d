const { ScholarshipApplications } = require('./scholarshipApplications.class');
const createModel = require('../../models/scholarshipApplications.model');
const hooks = require('./scholarshipApplications.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/scholarshipApplications', new ScholarshipApplications(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('scholarshipApplications');

  service.hooks(hooks);
};