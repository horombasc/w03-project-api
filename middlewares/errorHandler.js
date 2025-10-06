// middlewares/errorHandler.js
module.exports = (err, req, res, next) => {
  console.error(err.stack);
  if (res.headersSent) return next(err);
  const status = err.statusCode || 500;
  res.status(status).json({
    message: err.message || 'Internal server error'
  });
};
