import { Router } from 'express';
import { UserController } from '../controllers/UserController';

export class UserRouter {
  public router: Router;
  private userController: UserController;

  constructor(userController: UserController) {
    this.router = Router();
    this.userController = userController;
    this.initEndpoints();
  }

  private initEndpoints(): void {
    this.router.post('/register', this.userController.register);
    this.router.post('/login', this.userController.login);
    this.router.post('/logout', this.userController.logout);
  }
}
