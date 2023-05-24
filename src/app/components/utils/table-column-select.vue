<template>
  <wt-popup
    class="column-select"
    @close="$emit('close')"
    width="800"
  >
    <template v-slot:header>
      <h1 class="column-select__heading">{{$t('components.columnSelect.header')}}</h1>
    </template>
    <template v-slot:main>
      <ul class="column-select__list">
        <li
          class="column-select__item"
          v-for="(column, key) of sortedDraft"
          :key="key"
          @click.capture.prevent="column.show = !column.show"
        >
          <wt-checkbox v-model="column.show" :label="column.text"/>
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
        @click="$emit('close')"
      >{{ $t('reusable.cancel') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
import deepCopy from 'deep-copy';

export default {
  name: 'table-column-select',
  props: {
    value: {
      type: Array,
      required: true,
    },
  },

  model: {
    prop: 'value',
    event: 'change',
  },

  data: () => ({
    draft: [], // headers draft
    sortedDraft: [],
  }),

  watch: {
    value: {
      handler() {
        this.fillHeadersDraft();
      },
      immediate: true,
    },
  },

  mounted() {
    this.sortedDraft = this.value.sort((a, b) => {
      return a.text > b.text ? 1: -1;
      // sorting headers for alphabet just in popup
    });
  },

  methods: {
    setShownColumns() {
      const newDraft = this.draft.map((item) => {
        return {
          ...item,
          show: this.sortedDraft.find((header) => header.value === item.value).show,
        }
      });
      this.$emit('change', newDraft);
    },

    fillHeadersDraft() {
      this.draft = deepCopy(this.value);
    },

    // toggleHeader(column) {
    //   this.draft = this.draft.map((item) => {
    //     if(item.value === column.value) return { ...item, show: !item.show };
    //     return item;
    //   });
    //   column.show = !column.show;
    // },
  },
};
</script>

<style lang="scss" scoped>
.column-select__heading {
  text-align: center;
}

.column-select__list {
  @extend %wt-scrollbar;
  max-height: 48vh;
  min-width: 550px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: initial;
}

.column-select__item {
  display: flex;
  align-items: center;
  margin-right: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
}
</style>
