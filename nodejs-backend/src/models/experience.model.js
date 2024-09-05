
    module.exports = function (app) {
        const modelName = 'experience';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            name: { type: Schema.Types.ObjectId, ref: "member_profile" },
jobTitle: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
employmentType: { type: Schema.Types.Mixed, required: false, default: {"0":"FullTime","1":"PartTime","2":"Internship","3":"Contract","key":"Freelance"} },
companyName: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
startDate: { type: Date, required: false },
endDate: { type: Date, required: false },
Location: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },

            
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