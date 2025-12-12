<template>
  <wt-popup
    class="select-scorecard-popup"
    width="480"
    overflow
    @close="$emit('close')"
  >
    <template #header>
      {{ $t('registry.call.evaluation.selectTheScorecard') }}
    </template>
    <template #main>
      <wt-select
        v-model="scorecard"
        :label="$t('registry.call.evaluation.scorecard')"
        :search-method="loadScorecards"
        :clearable="false"
      />
    </template>
    <template #actions>
      <wt-button
        :disabled="!scorecard"
        @click="selectScorecard"
      >
        {{ $t('reusable.start') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="$emit('close')"
      >
        {{ $t('reusable.cancel') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import AuditFormAPI from '../../api/AuditFormAPI.js';

interface Scorecard {
  id: string;
  name: string;
  questions?: any;
}

interface Props {
  call: any
}

interface Emits {
  (e: 'close'): void;
  (e: 'change', scorecard: Scorecard): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const scorecardIdCacheKey = 'history-last-used-scorecard-id';

const scorecard = ref<Scorecard | null>(null);

const selectScorecard = () => {
  if (scorecard.value) {
    emit('change', scorecard.value);
    cacheScorecardId(scorecard.value.id);
    emit('close');
  }
};

const cacheScorecardId = (id: string) => {
  localStorage.setItem(scorecardIdCacheKey, id);
};

const setScorecardFromCache = async () => {
  const scorecardId = localStorage.getItem(scorecardIdCacheKey);
  if (scorecardId) {
    const response = await AuditFormAPI.get({ itemId: scorecardId });
    scorecard.value = response;
  }
};

const loadScorecards = (params) => AuditFormAPI.getLookup({
  ...params,
  fields: ['id', 'name', 'questions'],
  enabled: true,
  active: true,
  teamFilter: props.call?.user?.id,
});

onMounted(() => {
  setScorecardFromCache();
});
</script>

<style lang="scss" scoped>
</style>
