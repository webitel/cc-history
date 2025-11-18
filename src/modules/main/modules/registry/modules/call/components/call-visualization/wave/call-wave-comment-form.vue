<template>
  <section class="comment-form">
    <wt-timepicker
      v-model="draft.startSec"
      :v="v$.draft.startSec"
      :custom-validators="customValidation(0)"
      :label="$t('reusable.from')"
    />
    <wt-timepicker
      v-model="draft.endSec"
      :v="v$.draft.endSec"
      :custom-validators="customValidation(minimalEndCommentValue)"
      :label="$t('reusable.to')"
    />
    <div class="comment-form-textarea">
      <wt-textarea
        v-model:model-value="draft.note"
        class="comment-form-textarea__textarea"
        :class="{'comment-form-textarea--expanded': isTextareaExpanded}"
        :label="$t('registry.call.comment', 1)"
      />
      <wt-icon-btn
        class="comment-form-textarea__expand-btn"
        icon="expand"
        size="sm"
        @click="expandTextarea"
      />
    </div>
    <wt-button
      :disabled="disableSaving"
      @click="saveComment"
    >
      {{ $t('reusable.save') }}
    </wt-button>
    <wt-button
      v-if="draft.id"
      color="error"
      @click="deleteComment"
    >
      {{ $t('reusable.delete') }}
    </wt-button>
  </section>
</template>

<script>

import { useVuelidate } from '@vuelidate/core';
import { maxValue,minValue, required } from '@vuelidate/validators';
import convertDuration from '@webitel/ui-sdk/src/scripts/convertDuration';
import deepCopy from 'deep-copy';

export default {
  name: 'CallWaveCommentForm',

  props: {
    callId: {
      type: String,
      required: true,
    },
    callDuration: {
      type: Number,
      required: true,
    },
    comment: {
      type: Object,
    },
  },
  setup: () => ({
    v$: useVuelidate(),
  }),
  data: () => ({
    draft: {
      note: '',
      startSec: 0,
      endSec: 0,
    },
    isTextareaExpanded: false,
  }),

  computed: {
    customValidation() {
      return (value) => [
        {
          name: 'minValue',
          text: this.$t('validation.minValue', { min: convertDuration(value) }),
        }, {
          name: 'maxValue',
          text: this.$t('validation.maxValue').concat(` ${convertDuration(this.callDuration)}`),
        },
      ];
    },
    minimalEndCommentValue() {
      return Math.min(this.callDuration, this.draft.startSec);
    },
    disableSaving() {
      this.v$.draft.$touch();
      return this.v$.draft.$pending || this.v$.draft.$error;
    },
  },
  validations() {
    const draft = {
      startSec: {
        required,
        minValue: minValue(0),
        maxValue: maxValue(this.callDuration),
      },
      endSec: {
        required,
        minValue: minValue(this.draft.startSec),
        maxValue: maxValue(this.callDuration),
      },
    };
    return { draft };
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
@use '@webitel/ui-sdk/src/css/main' as *;

.comment-form {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);

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
