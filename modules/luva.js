
module.exports.teste = async(req, allowedKeys) => {
  allowedKeys.forEach((item) => {
    if (!req.body.hasOwnProperty(item)) {
      return false;
    }
  });
  for (var key in req.body) {
    if (!allowedKeys.includes(key)) {
      return false;
    }
  }
  return true;
};
