import { IUserRepository } from '../interfaces/repositories/IUserRepository';
import { IUser } from '../interfaces/types';

export class UserManager {
  public userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async creatUser(user: IUser): Promise<IUser | null> {
    return await this.userRepository.createUser(user);
  }

  async getUserByUsername(username: string): Promise<IUser | null> {
    return await this.userRepository.getUserByUsername(username);
  }

  async updateUser(username: string, userData: IUser): Promise<IUser> {
    return await this.userRepository.updateUser(username, userData);
  }
}
