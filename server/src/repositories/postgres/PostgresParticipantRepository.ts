import { IParticipant } from '../../interfaces/types';
import { IParticipantRepository } from '../../interfaces/repositories/IParticipantRepository';
import { PrismaClient } from '@prisma/client';

export class PosgresParticipantRepository implements IParticipantRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createParticipant(
    participant: IParticipant
  ): Promise<IParticipant | null> {
    try {
      const createdParticipant = await this.prisma.participant.create({
        data: {
          ...participant,
        },
      });
      return createdParticipant;
    } catch (error) {
      console.error('Error creating participant:', error);
      return null;
    }
  }

  async removeParticipant(participantId: string): Promise<IParticipant | null> {
    try {
      const removedParticipant = await this.prisma.participant.delete({
        where: {
          participant_id: participantId,
        },
      });
      return removedParticipant;
    } catch (error) {
      console.error('Error removing participant:', error);
      return null;
    }
  }
}
