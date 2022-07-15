<template>
    <wt-loader
      v-if="startSpin || currentState.value === TranscriptionState.ACTIVE"
      size="sm"
      color="icon"
    ></wt-loader>
    <wt-icon-btn
      v-else
      :color="currentState.color"
      :icon="currentState.icon"
      @click="currentState.handler()"
    ></wt-icon-btn>
</template>

<script>
import CallTranscriptAPI from '../api/CallTranscriptAPI';
import TranscriptionState from '../enums/TranscriptionState.enum';

export default {
  name: 'table-stt-action',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    TranscriptionState,
    isErrorPopupOpened: false,
    startSpin: false,
  }),
  computed: {
    currentState() {
      if (this.item.filesJob) return this.states[this.item.filesJob];
      if (this.item.transcripts) {
        return this.states[TranscriptionState.DONE];
      }
      return this.states[TranscriptionState.NONE];
    },
    states() {
      return {
        [TranscriptionState.IDLE]: {
          value: [TranscriptionState.IDLE],
          icon: 'idle',
        },
        [TranscriptionState.DONE]: {
          value: [TranscriptionState.DONE],
          icon: 'docs',
          color: 'success',
          handler: this.handleDoneClick,
        },
        [TranscriptionState.ERROR]: {
          value: [TranscriptionState.ERROR],
          icon: 'attention',
          handler: this.handleErrorClick,
        },
        [TranscriptionState.NONE]: {
          value: [TranscriptionState.NONE],
          icon: 'stt',
          handler: this.handleStartJob,
        },
      };
    },
  },
  methods: {
    handleDoneClick() {
      this.$router.push(`/${this.item.id}#transcript`);
    },
    handleErrorClick() {
      this.isErrorPopupOpened = true;
    },
    handleStartJob() {
      try {
        CallTranscriptAPI.create({ callId: this.item.id });
        this.startSpin = true;
      } finally {
      }
    },
  },
  watch: {
    item() {
      this.startSpin = false;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
