<template>
    <div class="table-stt-action">
      <wt-loader
        v-if="startSpin || currentState.value === TranscriptionState.ACTIVE"
        size="sm"
        color="icon"
      ></wt-loader>
      <wt-tooltip v-else>
        <template v-slot:activator>
          <wt-icon-btn
            :color="currentState.color"
            :icon="currentState.icon"
            @click="currentState.handler()"
          ></wt-icon-btn>
        </template>
        {{ currentState.tooltip }}
      </wt-tooltip>
      <stt-popup
        v-if="isSttPopup"
        :call="item"
        @close="isSttPopup = false"
        @delete="$emit('delete', $event)"
      ></stt-popup>
    </div>
</template>

<script>
import CallTranscriptAPI from '../../api/CallTranscriptAPI';
import TranscriptionState from '../../enums/TranscriptionState.enum';
import SttPopup from './stt-popup.vue';

export default {
  name: 'table-stt-action',
  components: { SttPopup },
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
    isSttPopup: false,
  }),
  computed: {
    currentState() {
      if (this.fileJob) return this.states[this.fileJob.state];
      if (this.item.transcripts?.length) {
        return this.states[TranscriptionState.DONE];
      }
      return this.states[TranscriptionState.NONE];
    },
    states() {
      return {
        [TranscriptionState.ACTIVE]: {
          value: TranscriptionState.ACTIVE,
        },
        [TranscriptionState.IDLE]: {
          value: TranscriptionState.IDLE,
          icon: 'idle',
          tooltip: this.$t('registry.stt.jobState.idle'),
        },
        [TranscriptionState.DONE]: {
          value: TranscriptionState.DONE,
          icon: 'docs',
          color: 'success',
          tooltip: this.$tc('registry.stt.transcription', 1),
          handler: this.handleDoneClick,
        },
        [TranscriptionState.ERROR]: {
          value: TranscriptionState.ERROR,
          icon: 'attention',
          tooltip: this.fileJob?.errorDetail,
          handler: this.handleStartJob,
        },
        [TranscriptionState.NONE]: {
          value: TranscriptionState.NONE,
          icon: 'stt',
          tooltip: this.$t('registry.stt.transcribe'),
          handler: this.handleStartJob,
        },
      };
    },
    fileJob() {
      return this.item.filesJob ? this.item.filesJob[0] : null;
    },
  },
  methods: {
    handleDoneClick() {
      this.isSttPopup = true;
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
