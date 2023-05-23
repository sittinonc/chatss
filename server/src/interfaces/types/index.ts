export interface IUser {
  user_id: string;
  name: string;
  username: string;
  hashed_password: string;
  salt: string;
  profile_image: string | null;
}

export interface IChat {
  chat_id: string;
  userA_id: string;
  userB_id: string;
  created_at: Date;
}
export interface IMessageType {
  message_type_id: string;
  type_name: string;
}

export interface IMessage {
  message_id: string;
  chat_id: string;
  sender_id: string;
  receiver_id: string;
  message_type_id: string;
  content: string;
  created_at: Date;
}
