module.exports = (err, req, res, next) => {
  if (err instanceof SyntaxError) {
    const error = {
      status: undefined, message: undefined, type: undefined, ...err,
    };
    if (error.status === 400 && 'body' in err) {
      res.status(400).json('Json invalid');
    }
  }
};
