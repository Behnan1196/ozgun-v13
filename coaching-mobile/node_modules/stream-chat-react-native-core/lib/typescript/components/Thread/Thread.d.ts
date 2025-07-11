import React from 'react';
import { ChatContextValue } from '../../contexts/chatContext/ChatContext';
import { MessagesContextValue } from '../../contexts/messagesContext/MessagesContext';
import { ThreadContextValue } from '../../contexts/threadContext/ThreadContext';
import { MessageInputProps } from '../MessageInput/MessageInput';
import type { MessageListProps } from '../MessageList/MessageList';
type ThreadPropsWithContext = Pick<ChatContextValue, 'client'> & Pick<MessagesContextValue, 'MessageList'> & Pick<ThreadContextValue, 'closeThread' | 'loadMoreThread' | 'parentMessagePreventPress' | 'reloadThread' | 'thread' | 'threadInstance'> & {
    /**
     * Additional props for underlying MessageInput component.
     * Available props - https://getstream.io/chat/docs/sdk/reactnative/ui-components/message-input/#props
     * */
    additionalMessageInputProps?: Partial<MessageInputProps>;
    /**
     * Additional props for underlying MessageList component.
     * Available props - https://getstream.io/chat/docs/sdk/reactnative/ui-components/message-list/#props
     * */
    additionalMessageListProps?: Partial<MessageListProps>;
    /** Make input focus on mounting thread */
    autoFocus?: boolean;
    /** Closes thread on dismount, defaults to true */
    closeThreadOnDismount?: boolean;
    /** Disables the thread UI. So MessageInput and MessageList will be disabled. */
    disabled?: boolean;
    /**
     * **Customized MessageInput component to used within Thread instead of default MessageInput
     * **Available from [MessageInput](https://getstream.io/chat/docs/sdk/reactnative/ui-components/message-input)**
     */
    MessageInput?: React.ComponentType<MessageInputProps>;
    /**
     * Call custom function on closing thread if handling thread state elsewhere
     */
    onThreadDismount?: () => void;
};
export type ThreadProps = Partial<ThreadPropsWithContext>;
/**
 * Thread - The Thread renders a parent message with a list of replies. Use the standard message list of the main channel's messages.
 * The thread is only used for the list of replies to a message.
 *
 * Thread is a consumer of [channel context](https://getstream.io/chat/docs/sdk/reactnative/contexts/channel-context/)
 * Underlying MessageList, MessageInput and Message components can be customized using props:
 * - additionalMessageListProps
 * - additionalMessageInputProps
 */
export declare const Thread: (props: ThreadProps) => React.JSX.Element;
export {};
//# sourceMappingURL=Thread.d.ts.map