<template>
  <wt-context-menu
    class="table-media-action"
    :options="contextOptions"
    max-width="400px"
    @click="handleOptionSelect"
  >
    <template #activator>
      <wt-icon-btn
        :icon="isAnyFilesPlaying ? 'stop': 'play'"
      />
    </template>
    <template #option="{ text, id }">
      <div class="table-media-action__option">
        <wt-icon
          :icon="id === currentlyPlaying ? 'stop' : 'play'"
        />
        {{ text }}
      </div>
    </template>
  </wt-context-menu>
</template>

<script>

export default {
  name: 'TableMediaAction',
  props: {
    files: {
      type: Array,
      required: true,
    },
    currentlyPlaying: {
      type: String,
    },
  },
  computed: {
    isAnyFilesPlaying() {
      return this.files.some((file) => file.id === this.currentlyPlaying);
    },
    contextOptions() {
      return this.files.map(({ name, id }) => ({ text: name, id }));
    },
  },
  methods: {
    handleOptionSelect({ option }) {
      if (this.currentlyPlaying === option.id) {
        this.$emit('stop');
      } else {
        this.$emit('play', option.id);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.table-media-action__option {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}
</style>
