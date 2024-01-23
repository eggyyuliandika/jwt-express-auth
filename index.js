const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { signIn } = require("./services/auth");
const { getUserById } = require("./services/users");
const { users } = require("./db");
const { encode, decode } = require("jsonwebtoken");
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send({
    success: "true",
  });
});

//route to login user
app.post("/auth/login", (req, res) => {
  const { username = null, password = null } = req.body;
  if (username === null || password === null) {
    return res.status(422).send({ error: "Username and Password is required" });
  }

  const userLogin = signIn(username, password);

  const payload = {
    id: userLogin.id,
    username: userLogin.username,
    email: userLogin.email,
  };

  const accessToken = encode(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "5m",
  });

  const refreshToken = encode(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });

  refreshToken.push(refreshToken);

  return res.send({
    success: true,
    access_token: accessToken,
    refresh_token: refreshToken,
  });
});

//route to get new access token by send refresh token
app.post("/auth/refresh-token", (req, res) => {
  const { refresh_token: refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(403).send({ error: "Token not found" });
  }

  if (!refreshToken.includes(refreshToken)) {
    return res.status(403).send({ error: "Token not found" });
  }

  //create variable to hold result from refresh token encryption
  let decoded;

  try {
    decoded = decode(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    return res.status(403).send({ error: "Token not valid" });
  }

  
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
