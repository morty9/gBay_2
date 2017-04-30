const mongoose = require('mongoose');
const Promise = require('bluebird');

module.exports = (api) => {
  api.mongoose = mongoose.connect(api.settings.db.url);
  api.mongoose.promise = Promise;
  api.models = {
    User: require('./User')(api),
    Product: require('./Product')(api),
    Order: require('./Order')(api),
    Opinion: require('./Opinion')(api),
    Category: require('./Category')(api),
    Token: require('./Token')(api),
  };
};
