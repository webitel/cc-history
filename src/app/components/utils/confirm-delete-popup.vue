<template>
  <div class="confirm-delete-popup">
    <wt-popup
      :min-width="480"
      @close="close"
    >
      <template v-slot:title>
        {{ $t('confirmDelete.title') }}
      </template>
      <template v-slot:main>
        {{ $tc('confirmDelete.askConfirmation', pluralization, { count }) }}
      </template>
      <template v-slot:actions>
        <wt-button
          :loading="progress"
          color="danger"
          @click="confirm"
        >{{ $t('reusable.delete') }}
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
export default {
  name: 'confirm-delete-popup',
  props: {
    count: {
      type: [Number, String],
      options: [1, '{many}', 'all'],
    },
    callback: {
      // type: Function, // Promise
    },
  },
  data: () => ({
    progress: false,
  }),
  computed: {
    pluralization() {
      if (typeof this.count === 'string' || this.count > 1) return 2;
      return 1;
    },
  },
  methods: {
    async confirm() {
      try {
        this.progress = true;
        await this.callback();
        this.close();
      } finally {
        this.progress = false;
      }
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
