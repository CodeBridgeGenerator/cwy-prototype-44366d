
    module.exports = function (app) {
        const modelName = 'scholarships';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            scholarshipID: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
scholarshipName: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
scholarshipDescription: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
eligibilityCriteria: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
applicationDeadline: { type: Date, required: false },

            
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