
    module.exports = function (app) {
        const modelName = 'institutions';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            InstitutionName: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
Location: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
name: { type: Schema.Types.ObjectId, ref: "member_profile" },

            
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