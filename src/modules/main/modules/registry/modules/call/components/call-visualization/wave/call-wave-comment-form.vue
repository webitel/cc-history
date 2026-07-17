<template>
  <section class="comment-form">
    <wt-timepicker
      v-model:model-value="draft.startSec"
      :v="startSecValidation"
      :custom-validators="startCustomValidation"
      :label="$t('reusable.from')"
    />
    <wt-timepicker
      v-model:model-value="draft.endSec"
      :v="endSecValidation"
      :custom-validators="endCustomValidation"
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
import {
	type CommentFormDraft,
	type NewCommentDraft,
	RangeField,
	type RangeField as RangeFieldType,
	type WaveAnnotation,
} from './call-wave.types';

defineOptions({
	name: 'CallWaveCommentForm',
});

const props = defineProps<{
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
const lastEditedField = ref<RangeFieldType | null>(null);

const minimalEndCommentValue = computed(() =>
	Math.min(props.callDuration, Number(draft.startSec)),
);

const maximumStartCommentValue = computed(() =>
	lastEditedField.value === RangeField.StartSec
		? Math.min(props.callDuration, Number(draft.endSec))
		: props.callDuration,
);

const rules = computed(() => ({
	draft: {
		startSec: {
			required,
			minValue: minValue(0),
			maxValue: maxValue(maximumStartCommentValue.value),
		},
		endSec: {
			required,
			minValue: minValue(
				lastEditedField.value === RangeField.EndSec
					? Number(draft.startSec)
					: 0,
			),
			maxValue: maxValue(props.callDuration),
		},
	},
}));

const v$ = useVuelidate(rules, {
	draft,
});

// vuelidate exports BaseValidation, but its `[key: string]: any` breaks Vue
// UnwrapRef / Pick, and computed rules make `v$.value.draft` infer as undefined.
interface DraftValidation {
	$touch: () => void;
	$reset: () => void;
	$pending: boolean;
	$invalid: boolean;
	startSec: {
		$touch: () => void;
		$reset: () => void;
	};
	endSec: {
		$touch: () => void;
		$reset: () => void;
	};
}

const draftValidation = computed(
	() => v$.value.draft as DraftValidation | undefined,
);
const startSecValidation = computed(() => draftValidation.value?.startSec);
const endSecValidation = computed(() => draftValidation.value?.endSec);

const disableSaving = computed(() => {
	const hasInvalidRange = Number(draft.startSec) > Number(draft.endSec);
	const validation = draftValidation.value;
	if (!validation) return true;

	return validation.$pending || validation.$invalid || hasInvalidRange;
});

const customValidation = (minValue: number, maxValue: number) => [
	{
		name: 'minValue',
		text: t('validation.minValue', {
			min: convertDuration(minValue),
		}),
	},
	{
		name: 'maxValue',
		text: t('validation.maxValue').concat(` ${convertDuration(maxValue)}`),
	},
];

const startCustomValidation = computed(() =>
	customValidation(0, maximumStartCommentValue.value),
);

const endCustomValidation = computed(() =>
	customValidation(minimalEndCommentValue.value, props.callDuration),
);

function expandTextarea() {
	isTextareaExpanded.value = !isTextareaExpanded.value;
}

function setOptionalDraftField(
	key: 'id' | 'fileId',
	value: string | undefined,
) {
	if (value) {
		draft[key] = value;
		return;
	}
	delete draft[key];
}

function initDraft(newDraft: WaveAnnotation | NewCommentDraft | null) {
	if (!newDraft) return;
	const value = deepCopy(newDraft);
	draft.note = value.note ?? '';
	draft.startSec = value.startSec ?? 0;
	draft.endSec = value.endSec ?? 0;
	setOptionalDraftField('fileId', value.fileId);
	setOptionalDraftField('id', 'id' in value ? value.id : undefined);
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

function handleRangeFieldChange(activeField: RangeFieldType) {
	const validation = draftValidation.value;
	if (!validation) return;

	lastEditedField.value = activeField;
	if (activeField === RangeField.StartSec) {
		validation.startSec.$touch();
		validation.endSec.$reset();
	} else {
		validation.endSec.$touch();
		validation.startSec.$reset();
	}
	emitDraftRange();
}

watch(
	() => props.comment,
	(value) => {
		initDraft(value);
		lastEditedField.value = null;
		v$.value.$reset();
	},
	{
		immediate: true,
	},
);

watch(
	() => draft.startSec,
	() => handleRangeFieldChange(RangeField.StartSec),
);
watch(
	() => draft.endSec,
	() => handleRangeFieldChange(RangeField.EndSec),
);
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
