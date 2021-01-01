import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import HttpException from '../errors/HttpException';
import { DataStoredInToken } from '../interfaces/auth.interface';
import DB from '../database';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cookies = req.cookies;

    if (cookies && cookies.Authorization) {
      const secret = process.env.JWT_SECRET;
      const verificationResponse = jwt.verify(
        cookies.Authorization,
        <string>secret,
      ) as DataStoredInToken;
      const userId = verificationResponse.id;
      const findUser = await DB.Users.findByPk(userId);

      if (findUser) {
        // req.user = findUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
