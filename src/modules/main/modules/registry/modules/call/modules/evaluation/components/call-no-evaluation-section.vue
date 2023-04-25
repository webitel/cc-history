<template>
  <article class="call-no-evaluation">
    <div class="call-no-evaluation__wrapper">
      <wt-icon icon="hs-rate" size="xl"/>
      <p class="call-no-evaluation__text">
        {{ $t('registry.call.stt.noEvaluation') }}
      </p>
      <wt-button @click="$emit('rateCall')">
        {{ $t('registry.stt.rateTheCall') }}
      </wt-button>
    </div>
  </article>
</template>

<script>

import { mapActions } from 'vuex';
import CallEvaluationAPI from '../api/CallEvaluationAPI';

export default {
  name: 'call-no-evaluation',
  props: {
    call: {
      type: Object,
    },
    namespace: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.call-no-evaluation {
  margin-top: var(--spacing-sm);
  border: 1px dashed var(--secondary-color);
}

.call-no-evaluation__wrapper {
  height: 248px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.call-no-evaluation__text {
  text-align: center;
}

</style>
