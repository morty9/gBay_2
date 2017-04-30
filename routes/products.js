const router = require('express').Router();

module.exports = (api) => {
  router.get('/',
    api.actions.products.findAll);

  router.get('/descprice',
      api.actions.products.sortByDescPrice);

  router.get('/ascprice',
      api.actions.products.sortByAscPrice);

  router.get('/descdate',
      api.actions.products.sortByDescDate);

  router.get('/ascdate',
      api.actions.products.sortByAscDate);

  router.get('/:id',
    api.actions.products.findOne);

  router.get('/categories/:id',
      api.middlewares.bodyParser.json(),
      api.actions.products.findAllByCategory);

  router.get('/seller/:id',
      api.middlewares.bodyParser.json(),
      api.actions.products.findAllBySeller);

  router.post('/',
    api.middlewares.bodyParser.json(),
    //api.middlewares.ensureAuthenticated,
    api.actions.products.create);

  router.put('/:id',
    api.middlewares.bodyParser.json(),
    api.actions.products.update);

  router.delete('/:id',
    api.actions.products.remove);

  return router;
}
