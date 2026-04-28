export interface CallHoldItem {
	start: number;
	stop: number;
	sec?: number;
}

export interface CallAudioFileSlice {
	startAt: number;
	stopAt: number;
}

export interface CallWaveCallRecord {
	id: string;
	createdAt: string;
	destination?: string;
	hold?: CallHoldItem[];
	files: {
		file_type_audio?: CallAudioFileSlice[];
	} & Record<string, unknown>;
	from: {
		name?: string;
		number?: string;
	};
	to?: {
		name?: string;
		number?: string;
	};
}

export interface WaveAnnotation {
	id?: string;
	note: string;
	startSec: number | string;
	endSec: number | string;
	createdAt?: string;
	updatedAt?: string;
	createdBy?: {
		name?: string;
		id?: string;
	};
	updatedBy?: {
		name?: string;
		id?: string;
	};
}

export interface CommentDragSelectionOptions {
	color: string;
	resize: boolean;
}

export interface NewCommentDraft {
	startSec: string;
	endSec: string;
	note: string;
}
