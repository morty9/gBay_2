module.exports = (api) => {
  return (req, res, next) => {
    if (!req.body || !req.body.endDate) {
      return res.status(400).send('missing.fields');
    }
    next();
  }
}
