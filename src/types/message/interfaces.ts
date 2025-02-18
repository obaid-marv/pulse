import { MessageData } from "../socketEvents";

export interface PreviousMessagesResponse {
    success: boolean,
    messages: MessageData[]
}