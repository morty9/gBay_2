const Schema = require('mongoose').Schema;
const timestamps = require('mongoose-timestamps');

module.exports = (api) => {
  const schema = new Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    isDirect: {
      type: Boolean,
      required: true
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    category: [{
      type: Schema.Types.ObjectId,
      ref: 'Category'
    }]
  });

    schema.plugin(timestamps);
    return api.mongoose.model('Product', schema);
  };
