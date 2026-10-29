<template>
  <article class="call-wave-comment-card">
    <wt-avatar
      :username="authorName"
      size="sm"
    />
    <div class="call-wave-comment-card__content">
      <header class="call-wave-comment-card__author">
        <p class="call-wave-comment-card__author-name typo-subtitle-2">
          {{ authorName }}
        </p>
        <p class="typo-caption">
          {{ dateLabel }}
        </p>
      </header>
      <wt-divider />
      <div class="call-wave-comment-card__range">
        <span class="typo-body-2">{{ rangeLabel }}</span>
        <wt-icon-btn
          icon="edit"
          :disabled="isEditing"
          @click="emit('edit-range')"
        />
      </div>
      <wt-divider />

      <wt-textarea
        v-if="isEditing"
        v-model:model-value="draftNote"
        class="call-wave-comment-card__textarea wt-scrollbar"
        :label="t('registry.call.comment', 1)"
      />
      <p
        v-else
        class="call-wave-comment-card__note wt-scrollbar typo-body-2"
      >
        {{ comment.note }}
      </p>

      <footer class="call-wave-comment-card__actions">
        <template v-if="isEditing">
          <wt-button
            size="sm"
            :loading="isSaving"
            :disabled="!draftNote.trim() || draftNote === comment.note"
            @click="saveNote"
          >
            {{ t('reusable.save') }}
          </wt-button>
          <wt-button
            size="sm"
            color="secondary"
            :disabled="isSaving"
            @click="cancelEditing"
          >
            {{ t('reusable.cancel') }}
          </wt-button>
        </template>
        <template v-else>
          <wt-button
            size="sm"
            color="secondary"
            @click="startEditing"
          >
            {{ t('reusable.edit') }}
          </wt-button>
          <wt-button
            size="sm"
            color="secondary"
            @click="emit('delete')"
          >
            {{ t('reusable.delete') }}
          </wt-button>
        </template>
      </footer>
    </div>
  </article>
</template>

<script setup lang="ts">
import { FormatDateMode } from '@webitel/ui-sdk/enums';
import { convertDuration } from '@webitel/ui-sdk/scripts';
import { formatDate } from '@webitel/ui-sdk/utils';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import type { WaveAnnotation } from './call-wave.types';
import {
	annotationSecondsToInt,
	getCommentAuthorName,
} from './composables/useCallWaveAnnotations';
import { COMMENT_CARD_WIDTH_PX } from './composables/useCallWaveCommentMarkers';

defineOptions({
	name: 'CallWaveCommentCard',
});

const props = defineProps<{
	comment: WaveAnnotation;
	saveNoteText: (note: string) => Promise<boolean>;
}>();

const emit = defineEmits<{
	(event: 'edit-range'): void;
	(event: 'delete'): void;
	(event: 'editing-change', value: boolean): void;
}>();

const { t } = useI18n();

const cardWidth = `${COMMENT_CARD_WIDTH_PX}px`;
const isEditing = ref(false);
const isSaving = ref(false);
const draftNote = ref('');

const authorName = computed(() => getCommentAuthorName(props.comment));

const wasEdited = computed(
	() =>
		!!props.comment.updatedAt &&
		!!props.comment.createdAt &&
		props.comment.updatedAt !== props.comment.createdAt,
);

const dateLabel = computed(() => {
	const date = wasEdited.value
		? props.comment.updatedAt
		: props.comment.createdAt;
	if (!date) {
		return '';
	}
	const label = wasEdited.value
		? t('registry.call.wave.edited')
		: t('registry.call.wave.created');
	return `${label} ${formatDate(+date, FormatDateMode.DATETIME_SHORT)}`;
});

const rangeLabel = computed(
	() =>
		`${convertDuration(annotationSecondsToInt(props.comment.startSec))} - ${convertDuration(
			annotationSecondsToInt(props.comment.endSec),
		)}`,
);

function setEditing(value: boolean) {
	isEditing.value = value;
	emit('editing-change', value);
}

function startEditing() {
	draftNote.value = props.comment.note;
	setEditing(true);
}

function cancelEditing() {
	setEditing(false);
}

async function saveNote() {
	isSaving.value = true;
	try {
		const isSaved = await props.saveNoteText(draftNote.value);
		if (isSaved) {
			setEditing(false);
		}
	} finally {
		isSaving.value = false;
	}
}
</script>

<style lang="scss" scoped>
.call-wave-comment-card {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-xs);
  box-sizing: border-box;
  width: v-bind(cardWidth);
  padding: var(--spacing-xs);
  border-radius: var(--p-overlay-popover-border-radius);
  background: var(--wt-tooltip-background-color);
  box-shadow: var(--tooltip-elevation);

  &__content {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: var(--spacing-2xs);
    min-width: 0;
  }

  &__range {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-xs);
  }

  &__author {
    min-width: 0;
  }

  &__author-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__note {
    max-height: 120px;
    overflow: auto;
    white-space: pre-wrap;
    word-break: break-word;
  }

  &__textarea :deep(.wt-textarea__textarea) {
    min-height: 0;
    height: 120px;
  }

  &__actions {
    display: flex;
    justify-content: center;
    gap: var(--spacing-xs);
  }
}
</style>
