import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const bodyParser = require('body-parser');

export class UserRouter {
  public router: Router;
  private userController: UserController;

  constructor(userController: UserController) {
    this.router = Router();
    this.userController = userController;
    this.initEndpoints();
  }

  private initEndpoints(): void {
    this.router.get('/:username', this.userController.getUserByUsername);
    this.router.post(
      '/create',
      bodyParser.json(),
      this.userController.createUser
    );
    this.router.put(
      '/:username/update',
      bodyParser.json(),
      this.userController.updateUser
    );
  }
}
