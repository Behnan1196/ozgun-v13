import React from 'react';
import type { GestureResponderEvent } from 'react-native';
import { MessageInputContextValue } from '../../contexts/messageInputContext/MessageInputContext';
type AttachButtonPropsWithContext = Pick<MessageInputContextValue, 'handleAttachButtonPress' | 'toggleAttachmentPicker'> & {
    disabled?: boolean;
    /** Function that opens attachment options bottom sheet */
    handleOnPress?: ((event: GestureResponderEvent) => void) & (() => void);
    selectedPicker?: 'images';
};
export type AttachButtonProps = Partial<AttachButtonPropsWithContext>;
/**
 * UI Component for attach button in MessageInput component.
 */
export declare const AttachButton: {
    (props: AttachButtonProps): React.JSX.Element;
    displayName: string;
};
export {};
//# sourceMappingURL=AttachButton.d.ts.map