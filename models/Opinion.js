const Schema = require('mongoose').Schema;
const timestamps = require('mongoose-timestamps');

module.exports = (api) => {
  const schema = new Schema({
    description: {
      type: String,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  });

  schema.plugin(timestamps);
  return api.mongoose.model('Opinion', schema);
};
