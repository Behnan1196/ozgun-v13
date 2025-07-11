import type { DeletedMessagesVisibilityType } from '../../../contexts/messagesContext/MessagesContext';
import type { PaginatedMessageListContextValue } from '../../../contexts/paginatedMessageListContext/PaginatedMessageListContext';
import type { ThreadContextValue } from '../../../contexts/threadContext/ThreadContext';
export type GetDateSeparatorsParams = {
    messages: PaginatedMessageListContextValue['messages'] | ThreadContextValue['threadMessages'];
    deletedMessagesVisibilityType?: DeletedMessagesVisibilityType;
    hideDateSeparators?: boolean;
    userId?: string;
};
export type DateSeparators = {
    [key: string]: Date;
};
export declare const getDateSeparators: (params: GetDateSeparatorsParams) => DateSeparators;
//# sourceMappingURL=getDateSeparators.d.ts.map