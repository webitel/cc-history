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
<!--    TODO TEST: можна перевірити, чи на клік емітиться івент з драфтом -->
    <wt-button @click="saveComment">
      {{ $t('reusable.save') }}
    </wt-button>
    <!--    TODO TEST: можна перевірити, чи на клік емітиться івент -->
    <!--    TODO TEST: можна перевірити, чи малюється кнопка на едіт -->
    <wt-button v-if="draft.id" @click="deleteComment">
      {{ $t('reusable.delete') }}
    </wt-button>
  </section>
</template>

<script>

import deepCopy from 'deep-copy';

/* todo test: renders a component? */
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
        this.initDraft(value);
      },
      immediate: true,
    },
  },

  methods: {
    /* TODO TEST: це я би не перевіряв -- занадто просто. Хіба можна емітити клік на
    *   іконку, і дивитись чи додається клас - якщо хочеш */
    expandTextarea() {
      this.isTextareaExpanded = !this.isTextareaExpanded;
    },
    initDraft(draft) {
      if (draft) {
        this.draft = deepCopy(draft);
      }
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
