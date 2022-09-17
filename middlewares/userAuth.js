var jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["x-access-token"];
  const token = authHeader && authHeader.split(" ")[1];
  try {
    // if (token == null) return res.sendStatus(401).json({status:"error",error:error});

    jwt.verify(token, process.env.JWTSECRETKEY, (err, user) => {
      console.log(err);
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } catch (error) {
    return res.sendStatus(401).json({ status: "error", error: error });
  }
}

module.exports = authenticateToken;
