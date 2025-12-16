import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import { promisify } from "util";

const verifyAsync = promisify(jwt.verify);

export const validateToken = async (req, res, next) => {
  
  try {
      let { token } = req.cookies;
    if (!token && req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1] ;
     
    }

    if (!token) return res.status(401).json(["Unauthorized validateToken"]);
    const decodedUser = await verifyAsync(token, TOKEN_SECRET);
    req.user = decodedUser;
    next();
  } catch (error) {
    return res.status(401).json(["Invalid token"]);
  }
};
