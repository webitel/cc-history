<template>
  <wt-popup
    class="column-select"
    @close="$emit('close')"
  >
    <template slot="header">
      <h1 class="column-select__heading">{{$t('components.columnSelect.header')}}</h1>
    </template>
    <template slot="main">
      <ul class="column-select__list">
        <li
          class="column-select__item"
          v-for="(col, key) of draft"
          :key="key"
          @click.capture.prevent="col.show = !col.show"
        >
          <wt-checkbox v-model="col.show" :label="col.text"/>
        </li>
      </ul>
    </template>
    <template slot="actions">
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
    }),

    watch: {
      value: {
        handler() {
          this.fillHeadersDraft();
        },
        immediate: true,
      },
    },

    methods: {
      setShownColumns() {
        this.$emit('change', this.draft);
      },

      fillHeadersDraft() {
        this.draft = deepCopy(this.value);
      },
    },
  };
</script>

<style lang="scss" scoped>
.column-select__heading {
  text-align: center;
}

.column-select__list {
  @extend %wt-scrollbar;
  max-height: 35vh;
  min-width: 550px;
  overflow: auto;
}

.column-select__item {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.wt-button:first-child {
  margin-right: 20px;
}
</style>
