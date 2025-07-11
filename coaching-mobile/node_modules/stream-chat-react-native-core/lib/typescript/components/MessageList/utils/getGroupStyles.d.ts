import type { DateSeparators } from './getDateSeparators';
import type { PaginatedMessageListContextValue } from '../../../contexts/paginatedMessageListContext/PaginatedMessageListContext';
import type { ThreadContextValue } from '../../../contexts/threadContext/ThreadContext';
export type GetGroupStylesParams = {
    dateSeparators: DateSeparators;
    messages: PaginatedMessageListContextValue['messages'] | ThreadContextValue['threadMessages'];
    hideDateSeparators?: boolean;
    maxTimeBetweenGroupedMessages?: number;
    noGroupByUser?: boolean;
    userId?: string;
};
export type GroupStyle = '' | 'middle' | 'top' | 'bottom' | 'single';
export declare const getGroupStyles: (params: GetGroupStylesParams) => {
    [key: string]: string[];
};
//# sourceMappingURL=getGroupStyles.d.ts.map