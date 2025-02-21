export interface MessageData {
  id?: number;
  senderId: number;
  receiverId?: number | null;
  groupId?: number | null;
  content: string;
  messageType: "text" | "image";
  createdAt?: string;
}

export interface ClientToServerEvents {
  sendMessage: (messageData: MessageData) => void;
  register: (userId: number) => void;
}

export interface ServerToClientEvents {
  receiveMessage: (messageData: MessageData) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  username?: string;
}
