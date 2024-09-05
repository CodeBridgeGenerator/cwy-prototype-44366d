
    module.exports = function (app) {
        const modelName = 'member_profile';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            name: { type: Schema.Types.ObjectId, ref: "users" },
dateOfBirth: { type: Date, required: false },
gender: { type: String, required: true, unique: false, lowercase: false, uppercase: false, maxLength: null, index: false, trim: false },
phonenumber: { type: String, required: true, unique: false, lowercase: false, uppercase: false, maxLength: null, index: false, trim: false },
address: { type: String, required: true, unique: false, lowercase: false, uppercase: false, minLength: null, maxLength: null, index: false, trim: false },
educationlevel: { type: String, required: true, unique: false, lowercase: false, uppercase: false, maxLength: null, index: false, trim: false },
nationality: { type: String, required: true, unique: false, lowercase: false, uppercase: false, maxLength: null, index: false, trim: false },
IDnumber: { type: String, required: true, unique: false, lowercase: false, uppercase: false, maxLength: null, index: false, trim: false },
previousInstituteName: { type: String, required: true, unique: false, lowercase: false, uppercase: false, maxLength: null, index: false, trim: false },
employmentStatus: { type: String, required: true, unique: false, lowercase: false, uppercase: false, maxLength: null, index: false, trim: false },
skills: { type: String, required: true, unique: false, lowercase: false, uppercase: false, maxLength: null, index: false, trim: false },

            
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