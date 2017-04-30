

module.exports = (api) => {
  api.middlewares = {
    ensureUserData: require('./ensureUserData')(api),
    ensureProductData: require('./ensureProductData')(api),
    ensureOrderData: require('./ensureOrderData')(api),
    ensureCategoryData: require('./ensureCategoryData')(api),
    ensureOpinionData: require('./ensureOpinionData')(api),
    ensureAuthenticated : require('./ensureAuthenticated')(api),
    ensureBidData : require('./ensureBidData')(api),
    bodyParser: require('body-parser'),
  }
};
