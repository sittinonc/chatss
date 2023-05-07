import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { IUser } from '../types';

export class UserController {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public register(req: Request, res: Response) {}

  public login(req: Request, res: Response) {}

  public logout(req: Request, res: Response) {}
}
