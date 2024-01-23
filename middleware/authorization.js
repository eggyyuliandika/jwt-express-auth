const { decode } = require("../utils/jwt");

function authorization(req, res, next) {
  const { authorization = null } = req.headers;
}
