const session = require("express-session");

const sessionMiddleware = session({
  secret: "Secret",
  resave: false, // Dont save session that doesnt change
  saveUninitialized: true, // Save session even there is no data
});

module.exports = sessionMiddleware;
