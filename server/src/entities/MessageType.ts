import { IMessageType } from '../interfaces/types';
class MessageType implements IMessageType {
  message_type_id: string;
  type_name: string;

  constructor(message_type_id: string, type_name: string) {
    this.message_type_id = message_type_id;
    this.type_name = type_name;
  }

  public getMessageTypeId(): string {
    return this.message_type_id;
  }

  public getTypeName(): string {
    return this.type_name;
  }
}

export default MessageType;
