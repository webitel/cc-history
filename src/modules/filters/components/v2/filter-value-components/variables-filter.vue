<template>
  <wt-input
    v-model="model"
    :v="v$.model"
  />
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import variableSearchValidator from '@webitel/ui-sdk/src/validators/variableSearchValidator/variableSearchValidator.js';
import { computed, watch } from 'vue';

type ModelValue = string;

const model = defineModel<ModelValue>();
if (!model.value) {
  model.value = '';
}

const v$ = useVuelidate(computed(() => ({
  model: {
    required: variableSearchValidator,
  },
})), { model }, { $autoDirty: true });

v$.value.$touch();

const emit = defineEmits<{
  'update:invalid': [boolean];
}>();

watch(() => v$.value.$invalid, (invalid) => {
  emit('update:invalid', invalid);
}, { immediate: true });
</script>

<style lang="scss" scoped>
.variables-filter {

}
</style>
