import type { Channel, ChannelState, MessageResponse, PollVote, UserResponse } from 'stream-chat';
type LatestMessage = ReturnType<ChannelState['formatMessage']> | MessageResponse;
export type LatestMessagePreview = {
    messageObject: LatestMessage | undefined;
    previews: {
        bold: boolean;
        text: string;
        draft?: boolean;
    }[];
    status: number;
    created_at?: string | Date;
};
export type LatestMessagePreviewSelectorReturnType = {
    createdBy?: UserResponse | null;
    latestVotesByOption?: Record<string, PollVote[]>;
    name?: string;
};
export declare enum MessageReadStatus {
    NOT_SENT_BY_CURRENT_USER = 0,
    UNREAD = 1,
    READ = 2
}
/**
 * Hook to set the display preview for latest message on channel.
 *
 * @param {*} channel Channel object
 *
 * @returns {object} latest message preview e.g.. { text: 'this was last message ...', created_at: '11/12/2020', messageObject: { originalMessageObject } }
 */
export declare const useLatestMessagePreview: (channel: Channel, forceUpdate: number, lastMessage?: ReturnType<ChannelState["formatMessage"]> | MessageResponse) => {
    created_at: string | Date | undefined;
    messageObject: MessageResponse | import("stream-chat").LocalMessage | undefined;
    previews: ({
        bold: boolean;
        draft: boolean;
        text: string;
    } | {
        bold: boolean;
        text: string;
        draft?: undefined;
    })[];
    status: MessageReadStatus;
};
export {};
//# sourceMappingURL=useLatestMessagePreview.d.ts.map