<template>
  <wt-select
    :clearable="false"
    :options="DirectionOptions"
    :value="model"
    :v="v$.model"
    class="direction-filter"
    track-by="value"
    use-value-from-options-by-prop="value"
    @input="model = $event"
  />
</template>

<script lang="ts" setup>
import DirectionOptions from '../../../enums/DirectionOptions.enum.js';
import {useVuelidate} from "@vuelidate/core";
import { required } from '@vuelidate/validators';
import {computed, watch} from "vue";

const model = defineModel<string>();

const v$ = useVuelidate(computed(() => ({
  model: {
    required,
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
</style>
