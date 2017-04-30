module.exports = (api) => {
  const Opinion = api.models.Opinion;
  const User = api.models.User;

  function create(req, res, next) {
      const userId = req.userId;
      const sellerId = req.body.seller;
      let opinion = new Opinion(req.body);
      opinion.user = userId;
      opinion.seller = sellerId;

      Opinion.findOne({
        user: opinion.user,
        seller: opinion.seller
      }, (err, found) => {
        if (err) {
          return res.status(500).send(err);
        }
        if (found) {
          return res.status(401).send('opinion.already.attributed');
        }
        else {
          opinion.save((err, data) => {
              if (err) {
                  return res.status(500).send(err);
              }
              User.findById(sellerId, (err, user) => {
                  if (err) {
                      return res.status(500).send()
                  }
                  user.opinions.push(data._id.toString())
                  user.save((err) => {
                      if (err) {
                          return res.status(500).send()
                      }
                      return res.send(data);
                  });
              });
          });
        }
      });
  };

  function findAll(req, res, next) {
    Opinion.find((err, data) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (!data || data.length == 0) {
        return res.status(204).send(data);
      }
      return res.send(data);
    });
  }

  function findOne(req, res, next) {
    Opinion.findById(req.params.id, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!data) {
        return res.status(204).send(data);
      }
      return res.send(data);
    });
  }

  function update(req, res, next) {
    const userId = req.userId;

    Opinion.findById(req.params.id, (err, data) => {
      console.log('userId: ', userId);
      console.log('dataUser: ', data.user);
      const opinionUser = data.user;
      if (err) {
        return res.status(500).send(err);
      }
      if (!data) {
        return res.status(204).send(data);
      }
      if (data.user.toString() === userId.toString()) {
        Opinion.findByIdAndUpdate(req.params.id,  req.body, (err, data) => {
          if (err) {
            return res.status(500).send(err);
          }
          if (!data) {
            return res.status(204).send(data);
          }
          return res.send(data);
        });
      }
      else {
        return res.status(401).send('opinion.update.not.authorize');
      }
    });
  }

  function remove(req, res, next) {
    Opinion.findByIdAndRemove(req.params.id, (err, data) => {
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
    findAll,
    findOne,
    update,
    remove
  };
}
