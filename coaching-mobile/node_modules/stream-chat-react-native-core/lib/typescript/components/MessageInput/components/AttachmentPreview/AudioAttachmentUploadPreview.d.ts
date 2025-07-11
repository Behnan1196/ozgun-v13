import React from 'react';
import { LocalAudioAttachment, LocalVoiceRecordingAttachment } from 'stream-chat';
import { AudioConfig, UploadAttachmentPreviewProps } from '../../../../types/types';
export type AudioAttachmentUploadPreviewProps<CustomLocalMetadata = Record<string, unknown>> = UploadAttachmentPreviewProps<LocalAudioAttachment<CustomLocalMetadata> | LocalVoiceRecordingAttachment<CustomLocalMetadata>> & {
    audioAttachmentConfig: AudioConfig;
    onLoad: (index: string, duration: number) => void;
    onPlayPause: (index: string, pausedStatus?: boolean) => void;
    onProgress: (index: string, progress: number) => void;
};
export declare const AudioAttachmentUploadPreview: ({ attachment, audioAttachmentConfig, handleRetry, removeAttachments, onLoad, onPlayPause, onProgress, }: AudioAttachmentUploadPreviewProps) => React.JSX.Element;
//# sourceMappingURL=AudioAttachmentUploadPreview.d.ts.map