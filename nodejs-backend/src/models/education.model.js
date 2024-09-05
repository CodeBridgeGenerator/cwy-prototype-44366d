
    module.exports = function (app) {
        const modelName = 'education';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            name: { type: Schema.Types.ObjectId, ref: "member_profile" },
NameofInstitution: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
EducationLevel: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
FieldofStudy: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
startDate: { type: Date, required: false },
endDate: { type: Date, required: false },
Grade: { type: Number, required: false, min: 0, max: 10000000 },

            
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