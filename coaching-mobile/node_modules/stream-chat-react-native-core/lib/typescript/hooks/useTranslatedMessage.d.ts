import type { LocalMessage, MessageResponse, TranslationLanguages } from 'stream-chat';
export declare const useTranslatedMessage: (message?: MessageResponse | LocalMessage) => {
    id: string;
    attachments?: import("stream-chat").Attachment[];
    html?: string;
    mml?: string;
    parent_id?: string;
    pin_expires?: string | null;
    pinned?: boolean;
    pinned_at?: string | null;
    poll_id?: string;
    quoted_message_id?: string;
    restricted_visibility?: string[];
    show_in_channel?: boolean;
    silent?: boolean;
    text?: string;
    type: "deleted" | "ephemeral" | "error" | "regular" | "reply" | "system";
    user?: import("stream-chat").UserResponse | null;
    user_id?: string;
    args?: string;
    before_message_send_failed?: boolean;
    channel?: import("stream-chat").ChannelResponse;
    cid?: string;
    command?: string;
    command_info?: {
        name?: string;
    };
    created_at?: string;
    deleted_at?: string;
    deleted_reply_count?: number;
    i18n?: import("stream-chat").RequireAtLeastOne<Record<`${TranslationLanguages}_text`, string>> & {
        language: TranslationLanguages;
    };
    latest_reactions?: import("stream-chat").ReactionResponse[];
    mentioned_users?: import("stream-chat").UserResponse[];
    message_text_updated_at?: string;
    moderation?: import("stream-chat").ModerationResponse;
    moderation_details?: import("stream-chat").ModerationDetailsResponse;
    own_reactions?: import("stream-chat").ReactionResponse[] | null;
    pinned_by?: import("stream-chat").UserResponse | null;
    poll?: import("stream-chat").PollResponse;
    reaction_counts?: {
        [key: string]: number;
    } | null;
    reaction_groups?: {
        [key: string]: import("stream-chat").ReactionGroupResponse;
    } | null;
    reaction_scores?: {
        [key: string]: number;
    } | null;
    reminder?: import("stream-chat").ReminderResponseBase;
    reply_count?: number;
    shadowed?: boolean;
    shared_location?: import("stream-chat").SharedLocationResponse;
    status?: string;
    thread_participants?: import("stream-chat").UserResponse[];
    updated_at?: string;
    quoted_message?: import("stream-chat").MessageResponseBase;
} | {
    html?: string | undefined;
    text?: string | undefined;
    id: string;
    attachments?: import("stream-chat").Attachment[] | undefined;
    mml?: string | undefined;
    parent_id?: string | undefined;
    pin_expires?: string | null | undefined;
    pinned?: boolean | undefined;
    poll_id?: string | undefined;
    quoted_message_id?: string | undefined;
    restricted_visibility?: string[] | undefined;
    show_in_channel?: boolean | undefined;
    silent?: boolean | undefined;
    type: "deleted" | "ephemeral" | "error" | "regular" | "reply" | "system";
    user?: (import("stream-chat").UserResponse | null) | undefined;
    user_id?: string | undefined;
    args?: string | undefined;
    before_message_send_failed?: boolean | undefined;
    channel?: import("stream-chat").ChannelResponse | undefined;
    cid?: string | undefined;
    command?: string | undefined;
    command_info?: {
        name?: string;
    } | undefined;
    deleted_reply_count?: number | undefined;
    i18n?: (import("stream-chat").RequireAtLeastOne<Record<`${TranslationLanguages}_text`, string>> & {
        language: TranslationLanguages;
    }) | undefined;
    latest_reactions?: import("stream-chat").ReactionResponse[] | undefined;
    mentioned_users?: import("stream-chat").UserResponse[] | undefined;
    message_text_updated_at?: string | undefined;
    moderation?: import("stream-chat").ModerationResponse | undefined;
    moderation_details?: import("stream-chat").ModerationDetailsResponse | undefined;
    own_reactions?: import("stream-chat").ReactionResponse[] | null | undefined;
    pinned_by?: (import("stream-chat").UserResponse | null) | undefined;
    poll?: import("stream-chat").PollResponse | undefined;
    reaction_counts?: {
        [key: string]: number;
    } | null | undefined;
    reaction_groups?: {
        [key: string]: import("stream-chat").ReactionGroupResponse;
    } | null | undefined;
    reaction_scores?: {
        [key: string]: number;
    } | null | undefined;
    reminder?: import("stream-chat").ReminderResponseBase | undefined;
    reply_count?: number | undefined;
    shadowed?: boolean | undefined;
    shared_location?: import("stream-chat").SharedLocationResponse | undefined;
    thread_participants?: import("stream-chat").UserResponse[] | undefined;
    created_at: Date;
    deleted_at: Date | null;
    pinned_at: Date | null;
    status: string;
    updated_at: Date;
    error?: import("stream-chat").ErrorFromResponse<import("stream-chat").APIErrorResponse>;
    quoted_message?: import("stream-chat").LocalMessageBase;
} | undefined;
//# sourceMappingURL=useTranslatedMessage.d.ts.map