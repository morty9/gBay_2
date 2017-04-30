module.exports = (api) => {
  api.actions = {
    auth: require('./auth')(api),
    users: require('./users/crud')(api),
    products: require('./products/crud')(api),
    categories: require('./categories/crud')(api),
    opinion: require('./opinion/crud')(api),
    orders: require('./orders/crud')(api),
  };
};
