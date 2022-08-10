import { HistoryFileJobHistoryFileJobState } from 'webitel-sdk';

const TranscriptionState = Object.freeze({
  NONE: 'none',
  DONE: 'done',
  ERROR: HistoryFileJobHistoryFileJobState.Error,
  IDLE: HistoryFileJobHistoryFileJobState.Idle,
  ACTIVE: HistoryFileJobHistoryFileJobState.Active,
  FINISHED: HistoryFileJobHistoryFileJobState.Finished,
});

export default TranscriptionState;
