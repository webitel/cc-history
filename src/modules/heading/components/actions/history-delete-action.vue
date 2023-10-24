<template>
  <div>
    <delete-confirmation-popup
      v-if="deletedCount"
      :callback="deleteCallback"
      :delete-count="deletedCount"
      @close="handleDeleteClose"
    />

    <wt-button-select
      :disabled="disableDelete"
      :options="deleteOptions"
      color="secondary"
      @click:option="$event.handler()"
    >{{ $t('reusable.delete') }}...
    </wt-button-select>
  </div>
</template>

<script>
import DeleteConfirmationPopup
  from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import CallRecordingsAPI from '../../../main/modules/registry/modules/recordings/api/CallRecordingsAPI';
import CallTranscriptAPI from '../../../main/modules/registry/modules/stt/api/CallTranscriptAPI';
import historyActionMixin from '../../mixins/historyActionMixin';

export default {
  name: 'history-delete-action',
  mixins: [historyActionMixin],
  components: {
    DeleteConfirmationPopup,
  },
  data: () => ({
    deletedCount: null,
    deleteCallback: null,
  }),
  computed: {
    disableDelete() {
      return !this.selected.length || this.selected
      .every(({ files, transcripts }) => !files && !transcripts);
    },
    deleteOptions() {
      const loadListAfter = (callback) => async () => {
        try {
          await callback();
        } finally {
          this.$emit('refresh');
        }
      };
      return [
        {
          value: 'recording',
          text: this.$tc('registry.recordings.recording', 2),
          handler: () => {
            this.deletedCount = this.selected.length;
            this.deleteCallback = loadListAfter(
              this.bulkDeleteRecordings.bind(this),
            );
          },
        },
        {
          value: 'transcript',
          text: this.$tc('registry.stt.transcription', 2),
          handler: () => {
            this.deletedCount = this.selected.length;
            this.deleteCallback = loadListAfter(
              this.bulkDeleteTranscripts.bind(this),
            );
          },
        },
        {
          value: 'both',
          text: this.$t('reusable.both'),
          handler: () => {
            this.deletedCount = this.selected.length;
            this.deleteCallback = loadListAfter(
              async () => Promise.allSettled([
                this.bulkDeleteRecordings.bind(this)(),
                this.bulkDeleteTranscripts.bind(this)(),
              ]),
            );
          },
        },
      ];
    },
  },
  methods: {
    async bulkDeleteTranscripts() {
      const callId = this.selected.map(({ id }) => id);
      return CallTranscriptAPI.delete({ callId });
    },
    async bulkDeleteRecordings() {
      const fileIds = this.selected
      .reduce(
        (fileIds, { files }) => (files ? fileIds
        .concat(files.map(({ id }) => id)) : fileIds),
        [],
      );
      return CallRecordingsAPI.delete(fileIds);
    },
    handleDeleteClose() {
      this.deletedCount = null;
      this.deleteCallback = null;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
