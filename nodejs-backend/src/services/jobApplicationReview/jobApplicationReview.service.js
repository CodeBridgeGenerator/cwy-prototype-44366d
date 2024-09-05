const { JobApplicationReview } = require('./jobApplicationReview.class');
const createModel = require('../../models/jobApplicationReview.model');
const hooks = require('./jobApplicationReview.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/jobApplicationReview', new JobApplicationReview(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('jobApplicationReview');

  service.hooks(hooks);
};