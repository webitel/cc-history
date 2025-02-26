<template>
  <div>
    <delete-confirmation-popup
      v-show="isDeleteConfirmationPopup"
      :delete-count="deleteCount"
      :callback="deleteCallback"
      @close="closeDelete"
    />

    <wt-button-select
      :disabled="disableDelete"
      :options="deleteOptions"
      color="secondary"
      @click:option="$event.handler()"
    >
      {{ $t('reusable.delete') }}...
    </wt-button-select>
  </div>
</template>

<script>
import DeleteConfirmationPopup
  from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import CallRecordingsAPI from '../../../main/modules/registry/modules/recordings/api/CallRecordingsAPI';
import CallTranscriptAPI from '../../../main/modules/registry/modules/stt/api/callTranscript.js';
import historyActionMixin from '../../mixins/historyActionMixin';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';


export default {
  name: 'HistoryDeleteAction',
  components: {
    DeleteConfirmationPopup,
  },
  mixins: [historyActionMixin],
  setup() {
    const {
      isVisible: isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,

      askDeleteConfirmation,
      closeDelete,
    } = useDeleteConfirmationPopup();

    return {
      isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,

      askDeleteConfirmation,
      closeDelete,
    };
  },
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
          text: this.$t('registry.recordings.recording', 2),
          handler: () => this.askDeleteConfirmation({
            deleted: this.selected,
            callback: loadListAfter(
              this.bulkDeleteRecordings.bind(this)
            ),
          }),
        },
        {
          value: 'transcript',
          text: this.$t('registry.stt.transcription', 2),
          handler: () => this.askDeleteConfirmation({
            deleted: this.selected,
            callback: loadListAfter(
              this.bulkDeleteTranscripts.bind(this)
            ),
          }),
        },
        {
          value: 'both',
          text: this.$t('reusable.both'),
          handler: () => this.askDeleteConfirmation({
            deleted: this.selected,
            callback: loadListAfter(
              async () => Promise.allSettled([
                this.bulkDeleteRecordings.bind(this)(),
                this.bulkDeleteTranscripts.bind(this)(),
              ]),
            ),
          }),
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
  },
};
</script>

<style lang="scss" scoped>

</style>
