const Schema = require('mongoose').Schema;
const timestamps = require('mongoose-timestamps');

module.exports = (api) => {
  const schema = new Schema({
    nickname: {
      type: String,
      required: true
    },
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    credit: {
      type: Number,
      required: false
    },
    seller: {
      type: Boolean,
      required: false
    },
    products: [{
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }],
    orders: [{
      type: Schema.Types.ObjectId,
      ref: 'Order'
    }],
    opinions: [{
      type: Schema.Types.ObjectId,
      ref: 'Opinion'
    }]
  });

  schema.plugin(timestamps);
  return api.mongoose.model('User', schema);
};
