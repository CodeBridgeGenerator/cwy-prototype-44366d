const companies = require('./companies/companies.service.js');
const branches = require('./branches/branches.service.js');
const departments = require('./departments/departments.service.js');
const sections = require('./sections/sections.service.js');
const roles = require('./roles/roles.service.js');
const positions = require('./positions/positions.service.js');
const templates = require('./templates/templates.service.js');
const mails = require('./mails/mails.service.js');
const tests = require('./tests/tests.service.js');
const userAddresses = require('./userAddresses/userAddresses.service.js');
const companyAddresses = require('./companyAddresses/companyAddresses.service.js');
const companyPhones = require('./companyPhones/companyPhones.service.js');
const users = require('./users/users.service.js');
const userPhones = require('./userPhones/userPhones.service.js');
const userInvites = require('./userInvites/userInvites1.service.js');
const staffinfo = require('./staffinfo/staffinfo.service.js');
const profiles = require('./profiles/profiles.service.js');
// 280624
const permissionServices = require('./permissionServices/permissionServices.service.js');
const permissionFields = require('./permissionFields/permissionFields.service.js');
const dynaLoader = require('./dynaLoader/dynaLoader.service.js');
const dynaFields = require('./dynaFields/dynaFields.service.js');
const mailQues = require('./mailQues/mailQues.service.js');
const employees = require('./employees/employees.service.js');
const jobQues = require('./jobQues/jobQues.service.js');
const superior = require('./superior/superior.service.js');
const prompts = require('./prompts/prompts.service.js');
const config = require('./config/config.service.js');
const chatai = require('./chatai/chatai.service.js');

const departmentAdmin = require('./departmentAdmin/departmentAdmin.service.js');
const departmentHOD = require('./departmentHOD/departmentHOD.service.js');
const departmentHOS = require('./departmentHOS/departmentHOS.service.js');
const mailWH = require('./mailWH/mailWH.service.js');
const inbox = require('./inbox/inbox.service.js');
const notifications = require('./notifications/notifications.service.js');
const errors = require('./errors/errors.service.js');
const errorsWH = require('./errorsWH/errorsWH.service.js');
const userLogin = require('./userLogin/userLogin1.service.js');
const userChangePassword = require('./userChangePassword/userChangePassword.service.js');

const memberProfile = require("./memberProfile/memberProfile.service.js");
const payments = require("./payments/payments.service.js");
const jobApplications = require("./jobApplications/jobApplications.service.js");
const jobs = require("./jobs/jobs.service.js");
const scholarshipApplications = require("./scholarshipApplications/scholarshipApplications.service.js");
const scholarships = require("./scholarships/scholarships.service.js");
const jobApplicationReview = require("./jobApplicationReview/jobApplicationReview.service.js");
const scholarshipApplicationReview = require("./scholarshipApplicationReview/scholarshipApplicationReview.service.js");
const education = require("./education/education.service.js");
const experience = require("./experience/experience.service.js");
const institutions = require("./institutions/institutions.service.js");
const memberInstitutions = require("./memberInstitutions/memberInstitutions.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
    app.configure(users);
    app.configure(companies);
    app.configure(branches);
    app.configure(departments);
    app.configure(sections);
    app.configure(roles);
    app.configure(positions);
    app.configure(profiles);
    app.configure(templates);
    app.configure(mails);
    app.configure(tests);
    app.configure(permissionServices);
    app.configure(permissionFields);
    app.configure(userAddresses);
    app.configure(companyAddresses);
    app.configure(companyPhones);
    app.configure(userPhones);
    app.configure(userInvites);
    app.configure(staffinfo);
    app.configure(dynaLoader);
    app.configure(dynaFields);
    app.configure(mailQues);
    app.configure(employees);
    app.configure(jobQues);
    app.configure(superior);
    // gen ai
    app.configure(prompts);
    app.configure(config);
    app.configure(chatai);

    app.configure(departmentAdmin);
    app.configure(departmentHOD);
    app.configure(departmentHOS);
    app.configure(mailWH);
    app.configure(inbox);
    app.configure(notifications);
    app.configure(errors);
    app.configure(errorsWH);
    app.configure(userLogin);
    app.configure(userChangePassword);
  app.configure(memberProfile);
  app.configure(payments);
  app.configure(jobApplications);
  app.configure(jobs);
  app.configure(scholarshipApplications);
  app.configure(scholarships);
  app.configure(jobApplicationReview);
  app.configure(scholarshipApplicationReview);
  app.configure(education);
  app.configure(experience);
  app.configure(institutions);
  app.configure(memberInstitutions);
    // ~cb-add-configure-service-name~
};
