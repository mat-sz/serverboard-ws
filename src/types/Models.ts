import { MessageType } from './MessageType';

export interface ClientModel {
  clientId: string;
  clientColor: string;
}

export interface MessageModel {
  type: MessageType;
}

export interface WelcomeMessageModel extends MessageModel {
  type: MessageType.WELCOME;
  clientId: string;
}

export interface PingMessageModel extends MessageModel {
  type: MessageType.PING;
  timestamp: number;
}
