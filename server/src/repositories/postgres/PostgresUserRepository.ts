import { IUserRepository } from '../../interfaces/repositories/IUserRepository';
import { IUser } from '../../interfaces/types';
import { PrismaClient } from '@prisma/client';

export class PostgresUserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createUser(user: IUser): Promise<IUser | null> {
    console.log('user:', user);

    try {
      const createdUser = await this.prisma.user.create({
        data: {
          ...user,
        },
      });
      return createdUser;
    } catch (error) {
      console.error('Error creating user:', error);
      return null;
    }
  }

  async getUserByUsername(username: string): Promise<IUser | null> {
    try {
      return await this.prisma.user.findUnique({
        where: {
          username: username,
        },
      });
    } catch (error) {
      console.error('Error getting user by username:', error);
      return null;
    }
  }

  async getUserById(userId: string): Promise<IUser | null> {
    try {
      return await this.prisma.user.findUnique({
        where: {
          user_id: userId,
        },
      });
    } catch (error) {
      console.error('Error getting user by id:', error);
      return null;
    }
  }

  async getUserByPublicKey(publicKey: string): Promise<IUser | null> {
    try {
      return await this.prisma.user.findUnique({
        where: {
          public_key: publicKey,
        },
      });
    } catch (error) {
      console.error('Error getting user by public key:', error);
      return null;
    }
  }

  async updateUser(username: string, userData: IUser): Promise<IUser> {
    console.log('Updating user:', username, userData);

    try {
      return await this.prisma.user.update({
        where: {
          username: username,
        },
        data: {
          ...userData,
        },
      });
    } catch (error) {
      console.error('Error updating user information:', error);
      throw new Error('Unable to update user information');
    }
  }
}
