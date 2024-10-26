import pkg from "jsonwebtoken";
import ForbiddenException from "../execeptions/ForbiddenException.js";
import UnauthorizedException from "../execeptions/UnauthorizedException.js";
import { config } from "dotenv";

const { verify } = pkg;

config()

export function authenticateJWT(allowedRoles = []) {
  return (req, res, next) => {
    // console.log(req)
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return next(new UnauthorizedException('Access denied. No token provided.'));
    }

    verify(token, process.env.JWT_ACCESS_TOKEN, (err, user) => {
      if (err) {
        return next(new ForbiddenException('Access denied. Token is not verified.'));
      }

      // Check if the user's role is in the allowed roles array
      if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        console.log("allowed")
        return next(new ForbiddenException('Access denied. You do not have the required role.'));
      }

      // Attach user to request object
      req.user = user;
      next();
    });
  };
}
