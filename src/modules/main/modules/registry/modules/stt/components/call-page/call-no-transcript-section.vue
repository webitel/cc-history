<template>
  <article class="call-no-transcript">
    <div
      v-if="fileJob && fileJob.state === JobState.Error"
      class="call-no-transcript__wrapper"
    >
      <p class="call-no-transcript__text">
        {{ $t('registry.stt.error') }}
      </p>
      <wt-icon
        icon="attention"
        size="xl"
        color="error"
      />
      <wt-button
        @click="transcribe"
      >
        {{ $t('reusable.retry') }}
      </wt-button>
    </div>

    <div
      v-else-if="fileJob"
      class="call-no-transcript__wrapper"
    >
      <p class="call-no-transcript__text">
        {{ $t('registry.call.stt.transcribingInProgress') }}
      </p>
      <wt-loader />
      <wt-button
        @click="refreshCall"
      >
        {{ $t('reusable.refresh') }}
      </wt-button>
    </div>

    <div
      v-else
      class="call-no-transcript__wrapper"
    >
      <p class="call-no-transcript__text">
        {{ $t('registry.call.stt.noTranscript') }}
      </p>
      <wt-icon
        icon="stt"
        size="xl"
        color="disabled"
      />
      <wt-button
        @click="transcribe"
      >
        {{ $t('registry.stt.transcribe') }}
      </wt-button>
    </div>
  </article>
</template>

<script>
import { EngineHistoryFileJobHistoryFileJobState } from '@webitel/api-services/gen/models';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapActions, mapState } from 'vuex';

import CallTranscriptAPI from '../../api/callTranscript.js';

export default {
  name: 'CallNoTranscript',
  props: {
    call: {
      type: Object,
      required: true,
    },
    namespace: {
      type: String,
    },
  },
  data: () => ({
    JobState: EngineHistoryFileJobHistoryFileJobState,
  }),
  computed: {
    ...mapState({
      file(state) {
        return getNamespacedState(state, this.namespace).selectedRecordingFile;
      },
    }),
    fileJob() {
      return (this.call.filesJob || []).find(({ fileId }) => this.file.id === fileId);
    },
  },
  methods: {
    ...mapActions({
      refreshCall(dispatch, payload) {
        return dispatch(`${this.namespace}/LOAD_MAIN_CALL`, payload);
      },
    }),
    async transcribe() {
      const callId = this.call.id;
      await CallTranscriptAPI.create({ callId });
      this.refreshCall();
    },
  },
};
</script>

<style lang="scss" scoped>
.call-no-transcript {
  max-width: 40%;
  padding: var(--spacing-lg);
  margin: var(--spacing-3xl) auto;
  border: 1px solid var(--secondary-color);
  border-radius: var(--border-radius);
}

.call-no-transcript__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.call-no-transcript__text {
  text-align: center;
}

</style>
