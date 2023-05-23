import { IChat } from '../interfaces/types';

class Chat implements IChat {
  chat_id: string;
  userA_id: string;
  userB_id: string;
  created_at: Date;

  constructor(
    chat_id: string,
    userA_id: string,
    userB_id: string,
    created_at: Date
  ) {
    this.chat_id = chat_id;
    this.userA_id = userA_id;
    this.userB_id = userB_id;
    this.created_at = created_at;
  }

  public getChatId(): string {
    return this.chat_id;
  }

  public getUserAId(): string {
    return this.userA_id;
  }

  public getUserBId(): string {
    return this.userB_id;
  }

  public getCreatedAt(): Date {
    return this.created_at;
  }
}

export default Chat;
