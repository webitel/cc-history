<template>
  <section class="comment-form">
    <wt-timepicker
      class="comment-form__timepicker"
      :label="$t('reusable.from')"
      v-model="comment.startSec"
    ></wt-timepicker>
    <wt-timepicker
      class="comment-form__timepicker"
      :label="$t('reusable.to')"
      v-model="comment.endSec"
    ></wt-timepicker>
    <div class="comment-form-textarea">
      <wt-textarea
        class="comment-form-textarea__textarea"
        :class="{'comment-form-textarea--large': largeTextarea}"
        v-model="comment.note"
        label="Note"
      ></wt-textarea>
      <wt-icon-btn
        class="comment-form-textarea--expand"
        icon="expand"
        size="sm"
        @click="expandTextarea"
      ></wt-icon-btn>
    </div>
    <wt-button class="comment-form__button" @click="saveComment">
      {{ $t('reusable.save') }}
    </wt-button>
  </section>
</template>

<script>

export default {
  name: 'opened-call-comment-form',
  data: () => ({
    comment: {
      note: '',
      startSec: 0,
      endSec: 0,
    },
    largeTextarea: false,
  }),
  methods: {
    expandTextarea() {
      this.largeTextarea = !this.largeTextarea;
    },
    saveComment() {
      console.log('saved');
    },
  },
};
</script>

<style lang="scss" scoped>
.comment-form::v-deep {
  margin: var(--component-spacing) 0;
  display: flex;
  align-items: flex-start;
  gap: var(--component-spacing);

  .comment-form__timepicker {
    flex-grow: 0;
    flex-basis: auto;
  }

  .comment-form-textarea {
    flex-grow: 1;
    position: relative;

    &__textarea {
      .wt-textarea__textarea {
        min-height: 0;
        height: 38px;
      }
    }

    &--large {
      .wt-textarea__textarea {
        height: 150px;
      }
    }

    &--expand {
      position: absolute;
      right: 30px;
      top: 38px
    }
  }

  .comment-form__button {
    margin-top: 26px;
  }
}
</style>
