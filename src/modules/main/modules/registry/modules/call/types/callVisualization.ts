import type {
	CallTranscriptCall,
	CallWaveCallRecord,
} from '@webitel/ui-sdk/modules/CallVisualization';
import type { Component } from 'vue';

export interface VisualizationTab {
	text: string;
	component: Component;
	value: string;
	props: Record<string, unknown>;
}

export type CallVisualizationCall = CallWaveCallRecord &
	CallTranscriptCall & {
		allowEvaluation?: boolean;
	};

export interface CallVisualizationProps {
	call: CallVisualizationCall;
	namespace?: string;
}
