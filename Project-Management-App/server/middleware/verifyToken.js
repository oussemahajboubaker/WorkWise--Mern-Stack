import jwt from "jsonwebtoken";
import { createError } from "../error.js";

export const verifyToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization)  return next(createError(401, "You are not authenticated!"));
    // Get the token from the header
    const token = req.headers.authorization.split(" ")[1];
    // Check if token exists
    if (!token)  return next(createError(401, "You are not authenticated!"));
    tk="5b6e0e337983ae4f67595f0b9de0d1d2c1ad4884ce4cd76f308203fb7e3abf42";

    const decode = await jwt.verify(token, tk);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error)
    res.status(402).json({ error: error.message })
  }
};