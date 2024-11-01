import pkg from "jsonwebtoken";
import ForbiddenException from "../execeptions/ForbiddenException.js";
import UnauthorizedException from "../execeptions/UnauthorizedException.js";
import { config } from "dotenv";

const { verify, TokenExpiredError, JsonWebTokenError } = pkg;

config();

export function authenticateJWT(allowedRoles = []) {
  return (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return next(new UnauthorizedException('Access denied. No token provided.'));
    }

    verify(token, process.env.JWT_ACCESS_TOKEN, (err, user) => {
      if (err) {
        if (err instanceof TokenExpiredError) {
          return next(new ForbiddenException('Access denied. Token has expired.'));
        }
        if (err instanceof JsonWebTokenError) {
          return next(new ForbiddenException('Access denied. Token is not verified.'));
        }
        // Handle any other errors that may occur
        return next(new ForbiddenException('Access denied. Invalid token.'));
      }

      // Check if the user's role is in the allowed roles array
      if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        return next(new ForbiddenException('Access denied. You do not have the required role.'));
      }

      // Attach user to request object
      req.user = user;
      next();
    });
  };
}
