import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { MessageContextValue } from '../../contexts/messageContext/MessageContext';
import { MessagesContextValue } from '../../contexts/messagesContext/MessagesContext';
export type FileAttachmentGroupPropsWithContext = Pick<MessageContextValue, 'files'> & Pick<MessagesContextValue, 'Attachment' | 'AudioAttachment'> & {
    /**
     * The unique id for the message with file attachments
     */
    messageId: string;
    styles?: Partial<{
        attachmentContainer: StyleProp<ViewStyle>;
        container: StyleProp<ViewStyle>;
    }>;
};
export type FileAttachmentGroupProps = Partial<Omit<FileAttachmentGroupPropsWithContext, 'messageId'>> & Pick<FileAttachmentGroupPropsWithContext, 'messageId'>;
export declare const FileAttachmentGroup: {
    (props: FileAttachmentGroupProps): React.JSX.Element | null;
    displayName: string;
};
//# sourceMappingURL=FileAttachmentGroup.d.ts.map