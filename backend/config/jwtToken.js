const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const signToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = signToken;
