<template>
  <section class="comment-form">
    <wt-timepicker
      class="comment-form__timepicker"
      :label="$t('reusable.from')"
      v-model="startSec"
    ></wt-timepicker>
    <wt-timepicker
      class="comment-form__timepicker"
      :label="$t('reusable.to')"
      v-model="endSec"
    ></wt-timepicker>
    <div class="comment-form-textarea">
      <wt-textarea
        class="comment-form-textarea__textarea"
        :class="{'comment-form-textarea--large': largeTextarea}"
        v-model="note"
        :label="$tc('registry.openedCall.comment', 1)"
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
    <div v-if="id">
      <wt-button class="comment-form__button" @click="deleteComment">
        {{ $t('reusable.delete') }}
      </wt-button>
    </div>
  </section>
</template>

<script>

import { mapActions } from 'vuex';

export default {
  name: 'opened-call-comment-form',
  data: () => ({
    note: '',
    startSec: 0,
    endSec: 0,
    id: '',
    largeTextarea: false,
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
  methods: {
    ...mapActions('registry/opened-call', {
        addAnnotation: 'ADD_ANNOTATION',
        editAnnotation: 'EDIT_ANNOTATION',
        deleteAnnotation: 'DELETE_ANNOTATION',
    }),
    expandTextarea() {
      this.largeTextarea = !this.largeTextarea;
    },
    saveComment() {
      const commentData = {
        callId: this.callId,
        note: this.note,
        startSec: this.startSec,
        endSec: this.endSec,
      };
      return this.id
        ? this.editAnnotation({
          id: this.id,
          ...commentData,
        })
        : this.addAnnotation(commentData);
    },
    deleteComment() {
      this.deleteAnnotation({
        id: this.id,
        callId: this.callId,
      });
    },
  },
  mounted() {
    if (this.comment) {
      this.note = this.comment.note;
      this.startSec = this.comment.startSec;
      this.endSec = this.comment.endSec;
      this.id = this.comment.id;

    }
  },
};
</script>

<style lang="scss" scoped>
.comment-form::v-deep {
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
        padding-right: 50px;
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
    margin-top: 26px; // In order to position button correctly in center of inputs
  }
}
</style>
