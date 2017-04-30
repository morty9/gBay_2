module.exports = (api) => {
  const Order = api.models.Order;
  const User = api.models.User;
  const Product = api.models.Product;

  function create(req, res, next) {
    const userId = req.userId;
    let order = new Order(req.body);

    order.buyer = userId;

    order.save((err, data) => {
        if (err) {
            return res.status(500).send(err);
        }

        order.seller = req.body.seller;
        order.product = req.body.product;

        User.findById(userId, (err, user) => {
            if (err) {
                return res.status(500).send();
            }

            user.orders.push(data._id.toString());
            user.save((err) => {
                if (err) {
                    return res.status(500).send();
                }

                return res.send(data);
            });
        });
    });

    // Product.find(req.body.product, (err, data) => {
    //   if (err) {
    //     return res.status(500).send(err);
    //   }
    //
    //   if (!data) {
    //     return res.status(204).send(data);
    //   }
    //
    //   User.find(req.body.seller, (err, seller) => {
    //     if (err) {
    //       return res.status(500).send(err);
    //     }
    //
    //     if (!seller) {
    //       return res.status(204).send(seller);
    //     }
    //
    //     return User.addCredit(data.price);
    //   })
    //
    // })

  };

  function findOne(req, res, next) {
    Order.findById(req.params.id, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (!data) {
        return res.status(204).send(data);
      }

      return res.send(data);
    });
  }

  function findAll(req, res, next) {
    Order.find((err, data) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (!data || data.length == 0) {
        return res.status(204).send(data);
      }

      return res.send(data);
    });
  }

  function update(req, res, next) {
    Order.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (!data) {
        return res.status(204).send(data);
      }

      return res.send(data);
    });
  }

  function remove(req, res, next) {
    Order.findByIdAndRemove(req.params.id, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (!data) {
        return res.status(204).send(data);
      }

      return res.send(data);
    });
  }

  function findAllOrderBySeller(req, res, next) {
    let user = new User(req.body);

    Order.find({'seller': req.params.id}, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (!data) {
        return res.status(401).send('no.orders');
      }

      return res.send(data);
    });
  }

   return {
     create,
     findOne,
     findAll,
     update,
     remove,
     findAllOrderBySeller
   };

}
