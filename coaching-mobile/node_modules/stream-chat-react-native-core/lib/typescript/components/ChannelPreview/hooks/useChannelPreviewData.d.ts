import type { Channel, MessageResponse, StreamChat } from 'stream-chat';
export declare const useChannelPreviewData: (channel: Channel, client: StreamChat, forceUpdateOverride?: number) => {
    latestMessagePreview: {
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
        status: import("./useLatestMessagePreview").MessageReadStatus;
    };
    muted: boolean;
    unread: number;
};
//# sourceMappingURL=useChannelPreviewData.d.ts.map