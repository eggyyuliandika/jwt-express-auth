const express = require("express");
const { getUserById } = require("./services/users");
const app = express();
const bodyParser = require("body-parser");
const { users } = require("./db");
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send({
    success: "true",
    users: users,
  });
});

app.post("/auth/login", (req, res) => {
  const { username = null, password = null } = req.body;
  if (username === null || password === null) {
    return res.status(403).send({ error: "Username and Password is required" });
  }

  const userLogin = signIn(username, password);

  return res.send({
    success: true,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
