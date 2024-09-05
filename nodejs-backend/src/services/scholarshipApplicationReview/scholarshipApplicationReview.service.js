const { ScholarshipApplicationReview } = require('./scholarshipApplicationReview.class');
const createModel = require('../../models/scholarshipApplicationReview.model');
const hooks = require('./scholarshipApplicationReview.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/scholarshipApplicationReview', new ScholarshipApplicationReview(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('scholarshipApplicationReview');

  service.hooks(hooks);
};