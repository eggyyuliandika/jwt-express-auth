const { decode } = require("../utils/jwt");

function authorization(req, res, next) {
  const { authorization = null } = req.headers;

   
  if(!authorization) {
    return res.status(403).send({error: "No authorization header found"})
  }
}
