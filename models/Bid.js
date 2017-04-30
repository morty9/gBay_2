const Schema = require('mongoose').Schema;
const timestamps = require('mongoose-timestamps');

module.exports = (api) => {
  const schema = new Schema({
    endDate: {
      type: Date,
      required: true
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    bidder: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    price: {
      type: Number,
      required: true
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  });

  schema.plugin(timestamps);
  return api.mongoose.model('Bid', schema);
};
