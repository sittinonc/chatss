import { IParticipant } from '../types';

export interface IParticipantRepository {
  createParticipant(participant: IParticipant): Promise<IParticipant | null>;

  removeParticipant(participantId: string): Promise<IParticipant | null>;
}
