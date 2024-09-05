
    module.exports = function (app) {
        const modelName = 'jobs';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            jobID: { type: String, required: true, unique: false, lowercase: false, uppercase: false, maxLength: null, index: false, trim: false },
jobTitle: { type: String, required: true, unique: false, lowercase: false, uppercase: false, maxLength: null, index: false, trim: false },
jobDescription: { type: String, required: true, unique: false, lowercase: false, uppercase: false, maxLength: null, index: false, trim: false },
jobRequirements: { type: String, required: true, unique: false, lowercase: false, uppercase: false, maxLength: null, index: false, trim: false },
companyName: { type: String, required: true, unique: false, lowercase: false, uppercase: false, maxLength: null, index: false, trim: false },
location: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
salary: { type: Number, required: false, min: 0, max: 10000000 },

            
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