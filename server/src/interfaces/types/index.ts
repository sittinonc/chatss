export interface IUser {
  user_id?: string;
  name: string;
  username: string;
  public_key: string;
  hashed_password: string;
  salt: string;
  profile_image: string | null;
}

export interface IChat {
  chat_id?: string;
  name: string;
  created_at?: Date;
}

export interface IParticipant {
  participant_id?: string;
  chat_id: string;
  user_id: string;
}

export interface IMessage {
  message_id?: string;
  chat_id: string;
  sender_id: string;
  content: string;
  created_at?: Date;
}
