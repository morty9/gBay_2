const router = require('express').Router();

module.exports = (api) => {
    router.get('/',
      api.actions.orders.findAll);

    router.get('/:id',
      api.actions.orders.findOne);

    router.get('/seller/:id',
      api.middlewares.ensureAuthenticated,
      api.actions.orders.findAllOrderBySeller);

    router.post('/',
      api.middlewares.bodyParser.json(),
      // api.middlewares.ensureAuthenticated,
      api.actions.orders.create);

    router.put('/:id',
      api.middlewares.bodyParser.json(),
      api.actions.orders.update);

    router.delete('/:id',
      api.middlewares.ensureAuthenticated,
      api.actions.orders.remove);

    return router;

}
