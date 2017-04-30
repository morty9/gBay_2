module.exports = (api) => {
  const User = api.models.User;
  const Product = api.models.Product;
  const Bid = api.models.Bid;

  function create(req, res, next) {
    const userId = req.userId;
    let bid = new Bid(req.body);

    bid.price = 0;

    bid.save((err, data) => {
      if (err) {
          return res.status(500).send(err);
      }

      if (!data) {
        return res.status(201).send(data);
      }

      Product.findOne({'_id' : req.body.product}, (err, product) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (!product) {
          return res.status(201).send(data);
        }

        if (bid.product.isDirect == true) {
          return res.status(401).send('not.a.bid');
        }

        bid.seller = product.seller;
        data.price = product.price;

        return res.send(data);
      });

    });
  }

  function findOne(req, res, next) {
    Bid.findById(req.params.id, (err, data) => {
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
    Bid.find((err, data) => {
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
    Bid.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (!data) {
        return res.status(204).send(data);
      }

      return res.send(data);
    });
  }

  function updatePrice(req, res, next) {
    const userId = req.userId;
    console.log(userId);
    console.log(req.body);
    Bid.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
      console.log(data);
      if (err) {
        return res.status(500).send(err);
      }

      if (!data) {
        return res.status(204).send(data);
      }

      data.bidder = userId;
      return res.send(data);
    });
  }

  function remove(req, res, next) {
    Bid.findByIdAndRemove(req.params.id, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (!data) {
        return res.status(204).send(data);
      }

      return res.send(data);
    });
  }

  function findAllBidBySeller(req, res, next) {
    let user = new User(req.body);

    Bid.find({'seller': req.params.id}, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (!data) {
        return res.status(401).send('no.orders');
      }

      return res.send(data);
    });
  }

  function checkBid(req, res, nest) {
    let date = new Date();

    Bid.findById(req.params.id, req.body, (err, data) => {

      if (err) {
        return res.status(500).send(err);
      }

      if (!data) {
        return res.status(401).send('no.orders');
      }

      if (data.endDate > date) {
        return res.status(401).send('ok');
      }

      return res.send(data);
    })

  }

   return {
     create,
     findOne,
     findAll,
     update,
     remove,
     updatePrice,
     findAllBidBySeller,
     checkBid
   };
}
