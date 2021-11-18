<template>
  <section class="comment-form">
    <wt-timepicker
      v-model="draft.startSec"
      :label="$t('reusable.from')"
    ></wt-timepicker>
    <wt-timepicker
      v-model="draft.endSec"
      :label="$t('reusable.to')"
    ></wt-timepicker>
    <div class="comment-form-textarea">
      <wt-textarea
        class="comment-form-textarea__textarea"
        :class="{'comment-form-textarea--expanded': isTextareaExpanded}"
        v-model="draft.note"
        :label="$tc('registry.openedCall.comment', 1)"
      ></wt-textarea>
      <wt-icon-btn
        class="comment-form-textarea__expand-btn"
        icon="expand"
        size="sm"
        @click="expandTextarea"
      ></wt-icon-btn>
    </div>
    <wt-button @click="saveComment">
      {{ $t('reusable.save') }}
    </wt-button>
    <div v-if="draft.id">
      <wt-button @click="deleteComment">
        {{ $t('reusable.delete') }}
      </wt-button>
    </div>
  </section>
</template>

<script>

export default {
  name: 'opened-call-comment-form',
  data: () => ({
    draft: {
      note: '',
      startSec: 0,
      endSec: 0,
    },
    isTextareaExpanded: false,
  }),

  props: {
    callId: {
      type: String,
      required: true,
    },
    comment: {
      type: Object,
    },
  },

  watch: {
    comment: {
      handler(value) {
        if (value) {
          this.draft = value;
        }
      },
      immediate: true,
    },
  },

  methods: {
    expandTextarea() {
      this.isTextareaExpanded = !this.isTextareaExpanded;
    },
    saveComment() {
      this.$emit('save', this.draft);
    },
    deleteComment() {
      this.$emit('delete');
    },
  },
};
</script>

<style lang="scss" scoped>
.comment-form {
  display: flex;
  align-items: flex-start;
  gap: var(--component-spacing);

  .wt-timepicker {
    flex-grow: 0;
    flex-basis: auto;
  }

  .comment-form-textarea {
    flex-grow: 1;
    position: relative;

    &__textarea::v-deep {
      .wt-textarea__textarea {
        @extend %wt-scrollbar;
        min-height: 0;
        height: 38px;
        padding-right: 50px;
      }
    }

    &--expanded::v-deep {
      .wt-textarea__textarea {
        @extend %wt-scrollbar;
        height: 150px;
      }
    }

    &__expand-btn {
      position: absolute;
      right: 30px;
      top: 38px
    }
  }

  .wt-button {
    margin-top: 26px; // In order to position button correctly in center of inputs
  }
}
</style>
