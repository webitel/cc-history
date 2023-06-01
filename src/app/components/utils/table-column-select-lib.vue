<template>
  <div class="wt-table-column-select">
    <wt-tooltip>
      <template v-slot:activator>
        <wt-icon-btn
          icon="column-select"
          @click="openPopup"
        ></wt-icon-btn>
      </template>
      {{ $t('webitelUI.tableColumnSelect.title') }}
    </wt-tooltip>
    <wt-popup
      v-if="isColumnSelectPopup"
      class="wt-table-column-select__popup"
      @close="close"
    >
      <template v-slot:title>
        {{ $t('webitelUI.tableColumnSelect.title') }}
      </template>
      <template v-slot:main>
        <ul class="wt-table-column-select__popup__list--md">
          <li
            v-for="(column, key) of changeableDraft"
            :key="key"
            class="wt-table-column-select__popup__item"
            @click.capture.prevent="column.show = !column.show"
          >
            <wt-checkbox
              v-model="column.show"
              :label="shownColLabel(column)"
            ></wt-checkbox>
          </li>
        </ul>
      </template>
      <template v-slot:actions>
        <wt-button
          @click="setShownColumns"
        >{{ $t('reusable.add') }}
        </wt-button>
        <wt-button
          color="secondary"
          @click="close"
        >{{ $t('reusable.cancel') }}
        </wt-button>
      </template>
    </wt-popup>
  </div>
</template>

<script>
import deepCopy from 'deep-copy';

export default {
  name: 'wt-table-column-select',
  props: {
    headers: {
      type: Array,
      required: true,
      description: 'Each header should have following schema: { value: String, show: Boolean, text: String }',
    },
    staticHeaders: {
      type: Array,
      default: () => [],
      description: 'Header values to exclude from selection',
    },
    popupWidth: {
      type: [Number, String],
    },
  },

  model: {
    prop: 'headers',
    event: 'change',
  },

  data: () => ({
    draft: [
        {
          value: "date",
          show: true,
          sort: null,
          field: "created_at",
          text: "Date"
        },
        {
          value: "time",
          show: true,
          sort: null,
          field: "created_at",
          text: "Time"
        },
        {
          value: "direction",
          show: true,
          sort: null,
          field: "direction",
          text: "Direction"
        },
        {
          value: "answeredAt",
          show: true,
          sort: null,
          field: "answered_at",
          text: "Answered at reporting"
        },
        {
          value: "bridgedAt",
          show: false,
          sort: null,
          field: "bridged_at",
          text: "Bridged at"
        },
        {
          value: "queueBridgedAt",
          show: false,
          sort: null,
          field: "queue_bridged_at",
          text: "Queue bridged at"
        },
        {
          value: "joinedAt",
          show: false,
          sort: null,
          field: "joined_at",
          text: "Joined at"
        },
        {
          value: "leavingAt",
          show: false,
          sort: null,
          field: "leaving_at",
          text: "Leaving at"
        },
        {
          value: "hangupAt",
          show: false,
          sort: null,
          field: "hangup_at",
          text: "Hangup at"
        },
        {
          value: "reportingAt",
          show: false,
          sort: null,
          field: "reporting_at",
          text: "Reporting at"
        },
        {
          value: "user",
          show: true,
          sort: null,
          field: "user",
          text: "User"
        },
        {
          value: "extension",
          show: false,
          sort: null,
          field: "extension",
          text: "Extension"
        },
        {
          value: "from",
          show: true,
          sort: null,
          field: "from",
          text: "From"
        },
        {
          value: "to",
          show: false,
          sort: null,
          field: "to",
          text: "To"
        },
      {
        value: "date",
        show: true,
        sort: null,
        field: "created_at",
        text: "Date"
      },
      {
        value: "time",
        show: true,
        sort: null,
        field: "created_at",
        text: "Time"
      },
      {
        value: "direction",
        show: true,
        sort: null,
        field: "direction",
        text: "Direction"
      },
      {
        value: "answeredAt",
        show: true,
        sort: null,
        field: "answered_at",
        text: "Answered at"
      },
      {
        value: "bridgedAt",
        show: false,
        sort: null,
        field: "bridged_at",
        text: "Bridged at"
      },
      {
        value: "queueBridgedAt",
        show: false,
        sort: null,
        field: "queue_bridged_at",
        text: "Queue bridged at"
      },
      {
        value: "joinedAt",
        show: false,
        sort: null,
        field: "joined_at",
        text: "Joined at"
      },
      {
        value: "leavingAt",
        show: false,
        sort: null,
        field: "leaving_at",
        text: "Leaving at"
      },
      {
        value: "hangupAt",
        show: false,
        sort: null,
        field: "hangup_at",
        text: "Hangup at"
      },
      {
        value: "reportingAt",
        show: false,
        sort: null,
        field: "reporting_at",
        text: "Reporting at"
      },
      {
        value: "user",
        show: true,
        sort: null,
        field: "user",
        text: "User"
      },
      {
        value: "extension",
        show: false,
        sort: null,
        field: "extension",
        text: "Extension"
      },
      {
        value: "from",
        show: true,
        sort: null,
        field: "from",
        text: "From"
      },
      {
        value: "to",
        show: false,
        sort: null,
        field: "to",
        text: "To To To To To"
      },
      {
        value: "reportingAt",
        show: false,
        sort: null,
        field: "reporting_at",
        text: "Reporting at"
      },
      {
        value: "user",
        show: true,
        sort: null,
        field: "user",
        text: "Sssssssser"
      },
      {
        value: "extension",
        show: false,
        sort: null,
        field: "extension",
        text: "Extension Extension"
      },
      {
        value: "from",
        show: true,
        sort: null,
        field: "from",
        text: "From"
      },
      {
        value: "to",
        show: false,
        sort: null,
        field: "to",
        text: "Odmdmdmdo"
      },
      {
        value: "reportingAt",
        show: false,
        sort: null,
        field: "reporting_at",
        text: "Leporting at sfdsfd"
      },
      {
        value: "user",
        show: true,
        sort: null,
        field: "user",
        text: "Sssssssser"
      },
      {
        value: "extension",
        show: false,
        sort: null,
        field: "extension",
        text: "Extension Extension"
      },
      {
        value: "leavingAt",
        show: false,
        sort: null,
        field: "leaving_at",
        text: "Leaving at"
      },
      {
        value: "hangupAt",
        show: false,
        sort: null,
        field: "hangup_at",
        text: "Hangup at"
      },
      {
        value: "reportingAt",
        show: false,
        sort: null,
        field: "reporting_at",
        text: "Reporting at"
      },
      {
        value: "user",
        show: true,
        sort: null,
        field: "user",
        text: "User User5rrr"
      },
      {
        value: "extension",
        show: false,
        sort: null,
        field: "extension",
        text: "Fffff Extension"
      },
    ], // headers draft
    isColumnSelectPopup: false,
  }),

  watch: {
    isColumnSelectPopup: {
      handler() {
        this.fillHeadersDraft();
      },
    },
  },
  computed: {
    changeableDraft() {
      console.log(this.draft);
      return this.draft.filter((header) => !this.staticHeaders.includes(header.value)).sort((a, b) => {
        return a.text > b.text ? 1 : -1;
        // sorting headers for alphabet just in popup
      });
    },
  },
  methods: {
    shownColLabel({ text, locale }) {
      if (!text && locale) {
        return typeof locale === 'string' ? this.$t(locale) : this.$t(...locale);
      }
      return text;
    },
    openPopup() {
      this.isColumnSelectPopup = true;
    },
    close() {
      this.isColumnSelectPopup = false;
    },
    fillHeadersDraft() {
      console.log(this.draft);
      // this.draft = deepCopy(this.headers);
    },
    setShownColumns() {
      this.$emit('change', this.draft);
      this.close();
    },
  },
};
</script>

<style lang="scss" scoped>

.wt-table-column-select {
  line-height: 0; // prevent 24x28 icon height :/
}

.wt-table-column-select__heading {
  text-align: center;
}

.wt-table-column-select__popup__list {
  @extend %wt-scrollbar;
  max-height: 48vh; // fixme popup fixed sizes
  width: calc(800px - var(--spacing-lg)); // fixme popup fixed sizes
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: initial;
  overflow-x: hidden;
  overflow-y: auto;

  &--sm {
    width: calc(800px - var(--spacing-lg));
  }

  &--md {
    width: calc(800px - var(--spacing-lg));
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(12, auto);
    grid-auto-flow: column;
  }
}

.wt-table-column-select__popup__item {
  display: flex;
  align-items: center;
  margin-right: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
  //width: calc(100%/3);
  flex: 1;
}

</style>
