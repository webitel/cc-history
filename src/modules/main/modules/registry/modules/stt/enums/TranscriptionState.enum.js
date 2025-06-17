import { EngineHistoryFileJobHistoryFileJobState } from '@webitel/api-services/gen/models';

const TranscriptionState = Object.freeze({
  NONE: 'none',
  DONE: 'done',
  ERROR: EngineHistoryFileJobHistoryFileJobState.Error,
  IDLE: EngineHistoryFileJobHistoryFileJobState.Idle,
  ACTIVE: EngineHistoryFileJobHistoryFileJobState.Active,
  FINISHED: EngineHistoryFileJobHistoryFileJobState.Finished,
});

export default TranscriptionState;
