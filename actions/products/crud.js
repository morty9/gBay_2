module.exports = (api) => {
  const Product = api.models.Product;
  const User = api.models.User;
  const Category = api.models.Category;

  function create(req, res, next) {
    const userId = req.userId;
    const categoryId = req.body.category;

    let products = new Product(req.body);
    products.seller = userId;

    Product.findOne({
      name: products.name,
    }, (err, found) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (found) {
        return res.status(401).send('product.already.exists');
      }

      else {
        if (req.body.price <= 0) {
          return res.status(401).send('price.is.negative');
        }
        products.save((err, data) => {
          if (err) {
            return res.status(500).send(err);
          }

          Category.findById(categoryId, (err, user) => {
            if (err) {
              return res.status(500).send(err);
            }

            products.category.push(data._id.toString());
              return res.send(data);
          });
        });
      }
    });
  }

  function findOne(req, res, next) {
    Product.findById(req.params.id, (err, data) => {
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
    Product.find((err, data) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (!data || data.length == 0) {
        return res.status(204).send(data);
      }
      return res.send(data);
    });
  }

  function sortByDescPrice(req, res, next) {
    Product.find({}).sort('-price').exec(function(err, data) {
      if (err) {
        return res.status(500).send(err);
      }

      if (!data || data.length == 0) {
        return res.status(204).send(data);
      }
      return res.send(data);
    });
  }

  function sortByAscPrice(req, res, next) {
    Product.find({}).sort('price').exec(function(err, data) {
      if (err) {
        return res.status(500).send(err);
      }

      if (!data || data.length == 0) {
        return res.status(204).send(data);
      }
      return res.send(data);
    });
  }

  function sortByDescDate(req, res, next) {
    Product.find({}).sort('-date').exec(function(err, data) {
      if (err) {
        return res.status(500).send(err);
      }

      if (!data || data.length == 0) {
        return res.status(204).send(data);
      }
      return res.send(data);
    });
  }

  function sortByAscDate(req, res, next) {
    Product.find({}).sort('date').exec(function(err, data) {
      if (err) {
        return res.status(500).send(err);
      }

      if (!data || data.length == 0) {
        return res.status(204).send(data);
      }
      return res.send(data);
    });
  }


  function findAllByCategory(req, res, next) {
    Product.find({category: req.params.id}, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!data || data.length == 0) {
        return res.status(204).send(data);
      }
      return res.send(data);
    });
  }

  function findAllBySeller(req, res, next) {
    Product.find({seller: req.params.id}, (err, data) => {
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
    const userId = req.userId;

    Product.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!data) {
        return res.status(204).send(data);
      }
      if (data.seller.toString() === userId.toString()) {
        return res.send(data);
      }
      else {
        return res.status(401).send('not.authorized.to.update.product');
      }
    });
  }

  function remove(req, res, next) {
    const userId = req.userId;

    Product.findByIdAndRemove(req.params.id, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!data) {
        return res.status(204).send(data);
      }
      if (data.seller == userId) {
        return res.send(data);
      }
      else {
        return res.status(401).send('not.authorized.to.delete.product')
      }
    });
  }

  return {
    create,
    findOne,
    findAll,
    sortByDescPrice,
    sortByAscPrice,
    sortByDescDate,
    sortByAscDate,
    findAllByCategory,
    findAllBySeller,
    update,
    remove
  };
}
