module.exports = (api) => {
  return (req, res, next) => {
    if (!req.body || !req.body.email || !req.body.password || !req.body.nickname || !req.body.fullName) {
      return res.status(400).send('missing.fields');
    }
    next();
  };
}
