const router = require('express').Router();

module.exports = (api) => {
    router.get('/',
      api.actions.bids.findAll);

    router.get('/:id',
      api.actions.bids.findOne);

    router.get('/seller/:id',
      api.actions.bids.findAllBidBySeller);

    router.post('/',
      api.middlewares.bodyParser.json(),
      api.middlewares.ensureBidData,
      api.middlewares.ensureAuthenticated,
      api.actions.bids.create);

    router.put('/:id',
      api.middlewares.bodyParser.json(),
      api.middlewares.ensureAuthenticated,
      api.actions.bids.update);

    router.put('/bidding/:id',
      api.middlewares.bodyParser.json(),
      api.middlewares.ensureAuthenticated,
      api.actions.bids.updatePrice);

    router.put('/availability/:id',
      api.middlewares.bodyParser.json(),
      api.actions.bids.checkBid);

    router.delete('/:id',
      api.middlewares.ensureAuthenticated,
      api.actions.bids.remove);

    return router;

}
