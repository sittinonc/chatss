import { IUser } from '../types';

export interface IUserRepository {
  createUser(user: IUser): Promise<IUser | null>;
  getUserByUsername(username: string): Promise<IUser | null>;
  getUserById(userId: string): Promise<IUser | null>;
  getUserByPublicKey(publicKey: string): Promise<IUser | null>;
  updateUser(username: string, userData: IUser): Promise<IUser>;
}
