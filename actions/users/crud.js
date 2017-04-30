const sha1 = require('sha1');

module.exports = (api) => {
  const User = api.models.User;
  const Order = api.models.Order;
  const Product = api.models.Product;

  function create(req, res, next) {
    let user = new User(req.body);
    user.password = sha1(user.password);
    if(user.seller == null) {
        user.seller = false;
    }

    User.findOne({
      email: user.email,
    }, (err, found) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (found) {
        return res.status(401).send('email.already.exists');
      }

      User.count((err, count) => {
        if (err) {
          return res.status(500).send(err);
        }

        return saveUser();
      });

    });

    function saveUser() {
      user.save((err, data) => {
        if (err) {
          return res.status(500).send(err);
        }

        return res.send(data);
      });
    }
  }

  function findOne(req, res, next) {
    User.findById(req.params.id, (err, data) => {
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
    setTimeout(getUsers, 3000);
    function getUsers() {
      User.find((err, data) => {
        if (err) {
          return res.status(500).send(err);
        }

        if (!data || data.length == 0) {
          return res.status(204).send(data);
        }

        //api.middlewares.cache.set('User', data, req.originalUrl);
        return res.send(data);
      });
    }
  }

  function findAllSeller(req, res, next) {
    let user = new User(req.body);

    setTimeout(getSellers, 3000);
    function getSellers() {
      User.find({'seller' : true}, (err, data) => {
        if (err) {
          return res.status(500).send(err);
        }

        if (!data) {
          return res.status(401).send('no.data');
        }

        return res.send(data);
      });
    }
  }

  function updateUsers(req, res, next) {
    let user = new User(req.body);

    User.findOne({
      email: user.email,
    }, (err, found) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (found) {
        return res.status(401).send('email.already.exists');
      }

      return updateUser();
    });

    function updateUser() {
      let user = req.userId;

      User.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
        if (err) {
          return res.status(500).send(err);
        }

        if (!data) {
          return res.status(204).send(data);
        }

        if (req.params.id != user) {
          return res.status(401).send('access.denied');
        }

        return res.send(data);
      });
    }

  }

  function remove(req, res, next) {

    User.findByIdAndRemove(req.params.id, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (!data) {
        return res.status(204).send(data);
      }

      return res.send(data);
    });
    // Product.find({'seller' : req.params.id}, (err, data) => {
    //   console.log(data);
    //   if (err) {
    //     return res.status(500).send(err);
    //   }
    //
    //   if (!data) {
    //     return res.status(204).send(data);
    //   }
    //
    //   Product.findByIdAndRemove({'id' : data._id}, (err, data) => {
    //     console.log(data);
    //       if (err) {
    //         return res.status(500).send(err);
    //       }
    //
    //       if (!data) {
    //         return res.status(204).send(data);
    //       }
    //
    //       return res.send(data);
    //   });
    // });
  }

  function addCredit(req, res, next) {
    let user = new User(req.body);
    let userAuthenticated = req.userId;

    User.findById(req.params.id, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (!data) {
        return res.status(204).send(data);
      }

      if (req.params.id != userAuthenticated) {
        return res.status(401).send('access.denied');
      }

      if (req.body.credit < 1) {
        return res.status(401).send('invalid.credit');
      }

      if (data.credit != null) {
        req.body.credit = data.credit += user.credit;
        return updateCredit();
      }
      return updateCredit();
    });

    function updateCredit() {
      User.findByIdAndUpdate(req.params.id, req.body, {new : true}, (err, data) => {
        if (err) {
          return res.status(500).send(err);
        }

        if (!data) {
          return res.status(204).send(data);
        }

        return res.send(data);
      });

    }
  }

  function averageOrder(req, res, next) {

    User.findById(req.params.id, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (!data) {
        res.status(204).send(data);
      }

      return getOrders(req.params.id);
    });

    function getOrders(id) {
      let i = 0;
      let average = 0;
      Order.find({'seller' : id} , (err, sellerId) => {
        if (err) {
          return res.status(500).send(err);
        }

        if (!sellerId) {
          return res.status(401).send('no.orders.exists');
        }

        while (i < sellerId.length) {
          average += sellerId[i].note;
          i++;
        }
        average /= sellerId.length;
        return res.send(average.toString());
      });
    }
  }

  return {
    create,
    findOne,
    findAll,
    findAllSeller,
    updateUsers,
    remove,
    addCredit,
    averageOrder
  };

}
