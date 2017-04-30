const Schema = require('mongoose').Schema;
const timestamps = require('mongoose-timestamps');

module.exports = (api) => {
  const schema = new Schema({
    number: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    note: {
      type: Number,
      required: true
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  });

  schema.plugin(timestamps);
  return api.mongoose.model('Order', schema);
};
