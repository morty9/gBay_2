module.exports = (api) => {
  const Product = api.models.Product;
  const User = api.models.User;
  const Category = api.models.Category;

  function create(req, res, next) {
    const userId = req.body.seller;
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
      console.log(data);
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
    Product.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
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
    Product.findByIdAndRemove(req.params.id, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!data) {
        return res.status(204).send(data);
      }
      return res.send(data);
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
