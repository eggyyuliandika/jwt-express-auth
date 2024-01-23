const jwt = require("jsonwebtoken");

//create JWT token by payload
function encode(payload, secret, options = {}) {
  const token = jwt.sign(payload, secret, options);
  return token;
}


