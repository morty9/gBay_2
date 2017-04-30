module.exports = (api) => {
  return (req, res, next) => {
    if (!req.body || !req.body.date || !req.body.note) {
      return res.status(400).send('missing.fields');
    }
    next();
  }
}
