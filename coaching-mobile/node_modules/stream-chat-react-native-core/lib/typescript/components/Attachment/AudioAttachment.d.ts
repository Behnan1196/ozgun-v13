import React from 'react';
import { AudioAttachment as StreamAudioAttachment } from 'stream-chat';
import { AudioConfig } from '../../types/types';
export type AudioAttachmentType = AudioConfig & Pick<StreamAudioAttachment, 'waveform_data' | 'asset_url' | 'title'> & {
    id: string;
    type: 'audio' | 'voiceRecording';
};
export type AudioAttachmentProps = {
    item: AudioAttachmentType;
    onLoad: (index: string, duration: number) => void;
    onPlayPause: (index: string, pausedStatus?: boolean) => void;
    onProgress: (index: string, progress: number) => void;
    titleMaxLength?: number;
    hideProgressBar?: boolean;
    showSpeedSettings?: boolean;
    testID?: string;
};
/**
 * AudioAttachment
 * UI Component to preview the audio files
 */
export declare const AudioAttachment: {
    (props: AudioAttachmentProps): React.JSX.Element;
    displayName: string;
};
//# sourceMappingURL=AudioAttachment.d.ts.map