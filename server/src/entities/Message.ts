import { IMessage } from '../interfaces/types';

class Message implements IMessage {
  message_id: string;
  chat_id: string;
  sender_id: string;
  receiver_id: string;
  message_type_id: string;
  content: string;
  created_at: Date;

  constructor(
    message_id: string,
    chat_id: string,
    sender_id: string,
    receiver_id: string,
    message_type_id: string,
    content: string,
    created_at: Date
  ) {
    this.message_id = message_id;
    this.chat_id = chat_id;
    this.sender_id = sender_id;
    this.receiver_id = receiver_id;
    this.message_type_id = message_type_id;
    this.content = content;
    this.created_at = created_at;
  }

  public getMessageId(): string {
    return this.message_id;
  }

  public getChatId(): string {
    return this.chat_id;
  }

  public getSenderId(): string {
    return this.sender_id;
  }

  public getReceiverId(): string {
    return this.receiver_id;
  }

  public getMessageTypeId(): string {
    return this.message_type_id;
  }

  public getContent(): string {
    return this.content;
  }

  public getCreatedAt(): Date {
    return this.created_at;
  }
}

export default Message;
