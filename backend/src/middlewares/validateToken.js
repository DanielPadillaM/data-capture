import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import { promisify } from "util";

const verifyAsync = promisify(jwt.verify);

export const validateToken = async (req, res, next) => {
    let { token } = req.cookies;
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ") || !token) return res.status(401).json(["Unauthorized"]);
    if (!token && authHeader) {
        token = authHeader.split(" ")[1] ;
     
    }
  try {
    const decodedUser = await verifyAsync(token, TOKEN_SECRET);
    req.user = decodedUser;
    next();
  } catch (error) {
    return res.status(401).json(["Invalid token"]);
  }
};
