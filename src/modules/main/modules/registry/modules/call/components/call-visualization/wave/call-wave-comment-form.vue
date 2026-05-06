<template>
  <section class="comment-form">
    <wt-timepicker
      v-model:model-value="draft.startSec"
      :v="v$.draft.startSec"
      :custom-validators="customValidation(0)"
      :label="$t('reusable.from')"
    />
    <wt-timepicker
      v-model:model-value="draft.endSec"
      :v="v$.draft.endSec"
      :custom-validators="customValidation(minimalEndCommentValue)"
      :label="$t('reusable.to')"
    />
    <div class="comment-form-textarea">
      <wt-textarea
        v-model:model-value="draft.note"
        class="comment-form-textarea__textarea wt-scrollbar"
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

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { maxValue, minValue, required } from '@vuelidate/validators';
import convertDuration from '@webitel/ui-sdk/src/scripts/convertDuration';
import deepCopy from 'deep-copy';
import { computed, reactive, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import type { NewCommentDraft, WaveAnnotation } from './call-wave.types';

defineOptions({
	name: 'CallWaveCommentForm',
});

interface CommentFormDraft {
	id?: string;
	note: string;
	startSec: number | string;
	endSec: number | string;
}

const props = defineProps<{
	callId: string;
	callDuration: number;
	comment: WaveAnnotation | NewCommentDraft | null;
}>();

const emit = defineEmits<{
	(event: 'save', value: CommentFormDraft): void;
	(event: 'delete'): void;
	(
		event: 'update-draft-range',
		value: {
			startSec: number;
			endSec: number;
		},
	): void;
}>();

const { t } = useI18n();

const draft = reactive<CommentFormDraft>({
	note: '',
	startSec: 0,
	endSec: 0,
});
const isTextareaExpanded = ref(false);

const minimalEndCommentValue = computed(() =>
	Math.min(props.callDuration, Number(draft.startSec)),
);

const rules = computed(() => ({
	draft: {
		startSec: {
			required,
			minValue: minValue(0),
			maxValue: maxValue(props.callDuration),
		},
		endSec: {
			required,
			minValue: minValue(Number(draft.startSec)),
			maxValue: maxValue(props.callDuration),
		},
	},
}));

const v$ = useVuelidate(rules, {
	draft,
});

const disableSaving = computed(() => {
	v$.value.draft.$touch();
	return v$.value.draft.$pending || v$.value.draft.$error;
});

const customValidation = (value: number) => [
	{
		name: 'minValue',
		text: t('validation.minValue', {
			min: convertDuration(value),
		}),
	},
	{
		name: 'maxValue',
		text: t('validation.maxValue').concat(
			` ${convertDuration(props.callDuration)}`,
		),
	},
];

function expandTextarea() {
	isTextareaExpanded.value = !isTextareaExpanded.value;
}

function initDraft(newDraft: WaveAnnotation | NewCommentDraft | null) {
	if (!newDraft) return;
	const value = deepCopy(newDraft);
	draft.note = value.note ?? '';
	draft.startSec = value.startSec ?? 0;
	draft.endSec = value.endSec ?? 0;
	if (value.id) {
		draft.id = value.id;
	} else {
		delete draft.id;
	}
}

function saveComment() {
	emit('save', deepCopy(draft));
}

function deleteComment() {
	emit('delete');
}

function emitDraftRange() {
	const startSec = Number(draft.startSec);
	const endSec = Number(draft.endSec);
	if (Number.isNaN(startSec) || Number.isNaN(endSec)) {
		return;
	}
	emit('update-draft-range', {
		startSec,
		endSec,
	});
}

watch(
	() => props.comment,
	(value) => {
		initDraft(value);
	},
	{
		immediate: true,
	},
);

watch(() => draft.startSec, emitDraftRange);
watch(() => draft.endSec, emitDraftRange);
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
        min-height: 0;
        height: 38px;
        padding-right: 50px;
      }
    }

    &--expanded::v-deep {
      .wt-textarea__textarea {
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
