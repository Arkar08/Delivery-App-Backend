import jwt from 'jsonwebtoken'
import Users from '../models/userSchema.js'


export const authMiddleware = async(req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
      try {
        const sliceToken = token.split(" ")
        const decoded = jwt.verify(sliceToken[1], process.env.secret_key);
        req.user = await Users.findById(decoded.userId)
        if (!req.user) {
          return res.status(404).json("User not found");
        }
        next();
      } catch (error) {
        return res.status(400).json("no authorized token failed");
      }
    } else {
      return res.status(400).json("no token");
    }
  };
  