import { IParticipant } from '../interfaces/types';
import { IParticipantRepository } from '../interfaces/repositories/IParticipantRepository';

export class ParticipantManager {
  public participantRepository: IParticipantRepository;

  constructor(participantRepository: IParticipantRepository) {
    this.participantRepository = participantRepository;
  }

  async createParticipant(
    participant: IParticipant
  ): Promise<IParticipant | null> {
    return await this.participantRepository.createParticipant(participant);
  }

  async removeParticipant(participant: string): Promise<IParticipant | null> {
    return await this.participantRepository.removeParticipant(participant);
  }
}
