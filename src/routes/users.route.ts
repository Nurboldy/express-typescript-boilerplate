import { CreateUserDto } from '../dtos/users.dto';
import { Router } from 'express';
import validationMiddleware from '../middlewares/validation.middleware';
import UsersController from '../controllers/users.controller';
import Route from '../interfaces/routes.interface';
import authMiddleware from '../middlewares/auth.middleware';

class UsersRoute implements Route {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.usersController.getUsers);
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateUserDto, 'body'),
      this.usersController.createUser,
    );
  }
}

export default UsersRoute;
