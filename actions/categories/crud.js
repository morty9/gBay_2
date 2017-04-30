module.exports = (api) => {
  const Category = api.models.Category;

  function create(req, res, next) {
    let category = new Category(req.body);

    Category.findOne({
      title: category.title,
    }, (err, found) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (found) {
        return res.status(401).send('category.already.exists');
      }

      Category.count((err, count) => {
        if (err) {
          return res.status(500).send(err);
        }

        return saveCategory();
      });
    });

    function saveCategory() {
      category.save((err, data) => {
        if (err) {
          return res.status(500).send(err);
        }

        return res.send(data);
      });
    }
  }

  function findOne(req, res, next) {
    Category.findById(req.params.id, (err, data) => {
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
    Category.find((err, data) => {
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
    Category.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (!data) {
        return res.status(204).send(data);
      }
      return res.send(data);
    });
  }




    function updateCategories(req, res, next) {
    let category = new Category(req.body);

    Category.findOne({
      title: category.title,
    }, (err, found) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (found) {
        return res.status(401).send('category.already.exists');
      }

      return updateCategorie();
    });
  }


    function updateCategorie() {
      Category.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
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
    Category.findByIdAndRemove(req.params.id, (err, data) => {
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
    update,
    remove
  };
}
