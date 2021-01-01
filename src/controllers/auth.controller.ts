import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '../dtos/users.dto';
import AuthService from '../services/auth.service';

class AuthController {
  public authService = new AuthService();

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    const userData: CreateUserDto = req.body;

    try {
      const { cookie, findUser } = await this.authService.login(userData);
      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, message: 'login' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
