
    module.exports = function (app) {
        const modelName = 'job_applications';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            jobApplicationID: { type: String, required: true, unique: false, lowercase: false, uppercase: false, maxLength: null, index: false, trim: false },
Name: { type: Schema.Types.ObjectId, ref: "users" },
jobName: { type: Schema.Types.ObjectId, ref: "jobs" },
jobApplicationDate: { type: Date, required: false },
resumeURL: { type: String, required: true, unique: false, lowercase: false, uppercase: false, minLength: null, maxLength: null, index: false, trim: false, default: '' },
coverLetter: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };