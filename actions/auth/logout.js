module.exports = (api) => {
  const Token = api.models.Token;

  return function logout(req, res, next) {
    Token.remove({userId: req.auth.userId}, (err, data) => {
            if (err)
                return res.status(500).send(err);
            res.send('logout.succeeded');
        });
  }
};
