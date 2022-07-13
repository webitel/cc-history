<template>
  <call-transcript-phrases
    v-if="transcript"
    :transcript="transcript"
  ></call-transcript-phrases>
  <call-no-transcript
    v-else
    :call="call"
    :namespace="namespace"
  ></call-no-transcript>
</template>

<script>
import CallNoTranscript from './call-no-transcript.vue';
import CallTranscriptPhrases from './call-transcript-phrases.vue';

export default {
  name: 'call-transcript',
  components: { CallNoTranscript, CallTranscriptPhrases },
  props: {
    call: {
      type: Object,
      required: true,
    },
    transcript: {
      type: Object,
    },
    namespace: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
