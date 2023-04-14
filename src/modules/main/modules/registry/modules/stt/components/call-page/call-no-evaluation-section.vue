<template>
  <article class="call-no-evaluation">
    <div class="call-no-evaluation__wrapper">
      <wt-icon icon="hs-rate" size="xl"/>
      <p class="call-no-evaluation__text">
        {{ $t('registry.call.stt.noEvaluation') }}
      </p>
      <wt-button @click="transcribe">
        {{ $t('registry.stt.rateTheCall') }}
      </wt-button>
    </div>
  </article>
</template>

<script>

import { mapActions } from 'vuex';
import CallTranscriptAPI from '../../api/CallTranscriptAPI';

export default {
  name: 'call-no-evaluation',
  props: {
    call: {
      type: Object,
    },
    namespace: {
      type: String,
    },
  },
  // data: () => ({
  //   JobState: HistoryFileJobHistoryFileJobState,
  // }),
  // computed: {
  //   fileJob() {
  //     return (this.call.filesJob || []).find(({ fileId }) => this.file.id === fileId);
  //   },
  // },
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
.call-no-evaluation {
  max-width: 40%;
  padding: var(--spacing-lg);
  margin: var(--spacing-3xl) auto;
}

.call-no-evaluation__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.call-no-evaluation__text {
  text-align: center;
}

</style>
