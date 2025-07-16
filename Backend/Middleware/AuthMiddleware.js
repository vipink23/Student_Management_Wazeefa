import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ message: "No token, authorization denied" });

    try {
      const decode = jwt.verify(token, process.env.ACCESS_TOKEN);
      req.user = decode;
      next();
    } catch (error) {
      return res.status(400).json({ message: "Token is not valid" });
    }
  } else {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
};

export default verifyToken;