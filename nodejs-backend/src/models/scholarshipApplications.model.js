
    module.exports = function (app) {
        const modelName = 'scholarship_applications';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            scholarshipApplicationID: { type: String, required: true, unique: false, lowercase: false, uppercase: false, maxLength: null, index: false, trim: false },
name: { type: Schema.Types.ObjectId, ref: "users" },
scholarshipName: { type: Schema.Types.ObjectId, ref: "scholarships" },
scholarshipApplicationDate: { type: Date, required: false },
essayURL: { type: String, required: true, unique: false, lowercase: false, uppercase: false, maxLength: null, index: false, trim: false },
recommendationLetterURL: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },

            
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