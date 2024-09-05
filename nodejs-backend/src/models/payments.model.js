
    module.exports = function (app) {
        const modelName = 'payments';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            paymentID: { type: String, required: true, unique: false, lowercase: false, uppercase: false, maxLength: null, index: false, trim: false },
payeeName: { type: Schema.Types.ObjectId, ref: "users" },
paymentStatus: { type: Schema.Types.Mixed, required: false, default: {"0":"Pending","1":"Completed","2":"Failed"} },
paymentMethod: { type: Schema.Types.Mixed, required: false, default: {"0":"CreditCard","1":"BankTransfer","2":"Cash"} },
receiptURL: { type: String, required: true, unique: false, lowercase: false, uppercase: false, minLength: null, maxLength: null, index: false, trim: false },
paymentDate: { type: Date, required: false },
paymentamount: { type: Number, required: false, min: 0, max: 1000000 },

            
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