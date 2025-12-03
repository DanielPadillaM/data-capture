import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import { promisify } from "util";

const signAsync = promisify(jwt.sign);

export const createAccessToken = async (payload) => {
  try {
    return await signAsync(payload, TOKEN_SECRET, { expiresIn: "1d" });
  } catch (error) {
    throw new Error("Error creating access token");
  }
};
