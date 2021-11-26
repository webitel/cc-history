<template>
  <section class="comment-form">
    <wt-timepicker
      v-model="draft.startSec"
      :v="$v.draft.startSec"
      :custom-validators="customValidation"
      :label="$t('reusable.from')"
    ></wt-timepicker>
    <wt-timepicker
      v-model="draft.endSec"
      :v="$v.draft.endSec"
      :custom-validators="customValidation"
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
    <wt-button
      :disabled="computeDisabled"
      @click="saveComment"
    >
      {{ $t('reusable.save') }}
    </wt-button>
    <wt-button
      v-if="draft.id"
      @click="deleteComment"
    >
      {{ $t('reusable.delete') }}
    </wt-button>
  </section>
</template>

<script>

import deepCopy from 'deep-copy';
import convertDuration from '@webitel/ui-sdk/src/scripts/convertDuration';
import { required, minValue } from 'vuelidate/lib/validators';
import { lessOrEqualTo, moreThen } from '../../../../../../../utils/customValidators';

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
    callDuration: {
      type: Number,
      required: true,
    },
    comment: {
      type: Object,
    },
  },

  computed: {
    customValidation() {
      return [{
        name: 'lessOrEqualTo',
        text: this.$t('registry.openedCall.lessOrEqualTo').concat(convertDuration(this.callDuration)),
      }, {
        name: 'moreThen',
        text: this.$t('registry.openedCall.moreThan').concat(convertDuration(this.draft.startSec)),
      }];
    },
    computeDisabled() {
      this.$v.draft.$touch();
      return this.$v.draft.$pending || this.$v.draft.$error;
    },
  },

  validations() {
    const draft = {
      startSec: {
        required,
        lessOrEqualTo: lessOrEqualTo(this.callDuration),
        minValue: minValue(0),
      },
      endSec: {
        required,
        lessOrEqualTo: lessOrEqualTo(this.callDuration),
        moreThen: moreThen(this.draft.startSec),
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
