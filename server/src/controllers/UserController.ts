import { Request, Response } from 'express';
import { IUser } from '../interfaces/types';
import { UserManager } from '../managers/UserManager';

export class UserController {
  private userManager: UserManager;

  constructor(userManager: UserManager) {
    this.userManager = userManager;
  }

  public createUser2 = (req: Request, res: Response): any => {
    console.log('req.body:', req.body);
    console.log('baseUrl', req.baseUrl);
    res.status(200).json({ message: 'Hello World!' });
  };

  public createUser = async (req: Request, res: Response): Promise<void> => {
    console.log('req.body:', req.body);

    const user: any = req.body;
    console.log('Creating user:', user, req.body);

    const createdUser = await this.userManager.creatUser(user);
    if (createdUser) {
      res.status(201).json(createdUser);
    } else {
      res.status(500).json({ error: 'Unable to create user' });
    }
  };

  public getUserByUsername = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const username = req.params.username;
    console.log('Getting user by username:', username);

    const user = await this.userManager.getUserByUsername(username);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  };

  public updateUser = async (req: Request, res: Response): Promise<void> => {
    console.log('req.body:', req.body);

    const username = req.params.username;
    const userData = req.body;
    try {
      const updatedUser = await this.userManager.updateUser(username, userData);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };
}
