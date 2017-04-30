module.exports = (api) => {
  api.use('/auth', require('./auth')(api));
  api.use('/users', require('./users')(api));
  api.use('/products', require('./products')(api));
  api.use('/categories', require('./categories')(api));
  api.use('/opinion', require('./opinion')(api));
  api.use('/orders', require('./orders')(api));
  api.use('/bids', require('./bids')(api));
};
