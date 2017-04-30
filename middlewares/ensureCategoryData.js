module.exports = (api) => {
  return (req, res, next) => {
    if (!req.body || !req.body.title || !req.body.description) {
      return res.status(400).send('missing.fields');
    }
    next();
  }
}
