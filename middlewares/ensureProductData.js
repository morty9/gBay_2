module.exports = (api) => {
  return (req, res, next) => {
    if (!req.body || !req.body.name || !req.body.description || !req.body.date || !req.body.price || !req.body.isDirect) {
      return res.status(400).send('missing.fields');
    }
    next();
  };
}
