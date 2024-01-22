const { users } = require("../../db");

function signIn(username, password) {
  const findUserByUsername = users.find((user) => user.username === username);
  if (!findUserByUsername) {
    return res.status(403).send({ error: "User not found" });
  }
  
  if (findUserByUsername.password !== password) {
    return res.status(403).send({ error: "Incorrect password!!!" });
  }

  return {
    id: findUserByUsername.id,
    username: findUserByUsername.username,
    email: findUserByUsername.email,
  };
}

module.exports = { signIn };
