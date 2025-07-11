import React from 'react';
import { MessageContextValue } from '../../../contexts/messageContext/MessageContext';
export type MessageStatusPropsWithContext = Pick<MessageContextValue, 'message' | 'readBy' | 'threadList'>;
export type MessageStatusProps = Partial<MessageStatusPropsWithContext>;
export declare const MessageStatus: {
    (props: MessageStatusProps): React.JSX.Element;
    displayName: string;
};
//# sourceMappingURL=MessageStatus.d.ts.map