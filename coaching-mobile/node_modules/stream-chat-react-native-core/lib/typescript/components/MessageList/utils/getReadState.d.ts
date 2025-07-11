import { ChannelState, LocalMessage } from 'stream-chat';
/**
 * Get the number of users who have read the message
 * @param message - The message to get the read state for
 * @param read - The read state of the channel
 * @returns The number of users who have read the message
 */
export declare const getReadState: (message: LocalMessage, read?: ChannelState["read"]) => number;
//# sourceMappingURL=getReadState.d.ts.map