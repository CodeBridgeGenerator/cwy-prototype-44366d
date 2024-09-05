
    module.exports = function (app) {
        const modelName = 'admins';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            AdminID: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
username: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
email: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
password: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },

            
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