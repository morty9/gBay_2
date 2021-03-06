const router = require('express').Router();

module.exports = (api) => {
    router.get('/',
        api.actions.users.findAll);

    router.get('/seller',
        api.actions.users.findAllSeller);

    router.get('/:id',
        api.actions.users.findOne);

    router.get('/average/:id',
        api.actions.users.averageOrder);

    router.post('/',
        api.middlewares.bodyParser.json(),
        api.actions.users.create);

    router.put('/:id',
        api.middlewares.bodyParser.json(),
        api.middlewares.ensureAuthenticated,
        api.actions.users.updateUsers);

    router.put('/credit/:id',
        api.middlewares.bodyParser.json(),
        api.middlewares.ensureAuthenticated,
        api.actions.users.addCredit);

    router.delete('/:id',
        api.middlewares.ensureAuthenticated,
        api.actions.users.remove);

    return router;
}
