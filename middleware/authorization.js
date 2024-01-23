const { decode } = require("../utils/jwt");

function authorization(req, res, next) {
  const { authorization = null } = req.headers;

  if (!authorization) {
    return res.status(403).send({ error: "No authorization header found" });
  }

  //Divide the authorization header value by a space and take the second part (index 1) as a token. If no token is found, the default value is set to null.
  const token = authorization.split(" ")[1] ?? null;

  if (!token) {
    return res.status(403).send({ error: "Token not valid" });
  }

  let decoded;

  try {
    decoded = decode(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    return res.status(403).send({ error: "Token not valid" });
  }

  req.user = decoded;

  next();
}
module.exports = authorization;
