
    module.exports = function (app) {
        const modelName = 'scholarship_application_review';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            scholarshipAppID: { type: Schema.Types.ObjectId, ref: "scholarship_applications" },
admin: { type: Schema.Types.ObjectId, ref: "users" },
comments: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
approvalDate: { type: Date, required: false },
approvalStatus: { type: Boolean, required: false, default: false },

            
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