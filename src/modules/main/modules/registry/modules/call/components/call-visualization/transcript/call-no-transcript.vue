<template>
  <article class="call-no-transcript">
    <div
      class="call-no-transcript__wrapper"
      v-if="!call.filesJob"
    >
      <p class="call-no-transcript__text">{{ $t('registry.call.stt.noTranscript') }}</p>
      <wt-button
        @click="transcribe"
      >{{ $t('registry.stt.transcribe') }}
      </wt-button>
    </div>
    <div
      v-else
      class="call-no-transcript__wrapper"
    >
      <p class="call-no-transcript__text">{{ $t('registry.call.stt.transcribingInProgress') }}</p>
      <wt-loader></wt-loader>
      <wt-button
        @click="refreshCall"
      >{{ $t('reusable.refresh') }}
      </wt-button>
    </div>
  </article>
</template>

<script>
import { mapActions } from 'vuex';
import CallTranscriptAPI from '../../../../stt/api/CallTranscriptAPI';

export default {
  name: 'call-no-transcript',
  props: {
    call: {
      type: Object,
      required: true,
    },
    namespace: {
      type: String,
    },
  },
  methods: {
    ...mapActions({
      refreshCall(dispatch, payload) {
        return dispatch(`${this.namespace}/LOAD_MAIN_CALL`, payload);
      },
    }),
    async transcribe() {
      const fileId = this.call.files[0].id;
      await CallTranscriptAPI.create({ fileId: [fileId] });
      return this.refreshCall();
    },
  },
};
</script>

<style lang="scss" scoped>
.call-no-transcript__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: var(--spacing-xs);

  .wt-loader {
    margin: var(--spacing-sm) 0;
  }
}

.call-no-transcript__text {
  text-align: center;
}

</style>
