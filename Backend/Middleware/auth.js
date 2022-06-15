const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send({ error: "No token provided" });

  const parts = authHeader.split(" ");

  if (!parts === 2) return res.status(401).send({ error: "Token error" });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(400).send({ error: "Token malformatted" });

  jwt.verify(token, process.env.SECRET_KEY, (error, decode) => {
    if (error) return res.status(401).send({ error: "Token Invalid" });
    res.userId = decode.id;
    return next();
  });
};
