<template>
  <article class="call-no-transcript">
    <div
      class="call-no-transcript__wrapper"
      v-if="fileJob && fileJob.state === JobState.Error"
    >
      <p class="call-no-transcript__text">
        {{ $t('registry.stt.error') }}
      </p>
      <wt-icon
        icon="attention"
        size="xl"
        color="danger"
      ></wt-icon>
      <wt-button
        @click="transcribe"
      >{{ $t('reusable.retry') }}
      </wt-button>
    </div>

    <div
      v-else-if="fileJob"
      class="call-no-transcript__wrapper"
    >
      <p class="call-no-transcript__text">
        {{ $t('registry.call.stt.transcribingInProgress') }}
      </p>
      <wt-loader></wt-loader>
      <wt-button
        @click="refreshCall"
      >{{ $t('reusable.refresh') }}
      </wt-button>
    </div>

    <div
      class="call-no-transcript__wrapper"
      v-else
    >
      <p class="call-no-transcript__text">
        {{ $t('registry.call.stt.noTranscript') }}
      </p>
      <wt-icon
        icon="stt"
        size="xl"
        color="secondary"
      ></wt-icon>
      <wt-button
        @click="transcribe"
      >{{ $t('registry.stt.transcribe') }}
      </wt-button>
    </div>
  </article>
</template>

<script>
import { mapActions } from 'vuex';
import { HistoryFileJobHistoryFileJobState } from 'webitel-sdk';
import CallTranscriptAPI from '../../api/CallTranscriptAPI';

export default {
  name: 'call-no-transcript',
  props: {
    call: {
      type: Object,
      required: true,
    },
    file: {
      type: Object,
      required: true,
    },
    namespace: {
      type: String,
    },
  },
  data: () => ({
    JobState: HistoryFileJobHistoryFileJobState,
  }),
  computed: {
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
