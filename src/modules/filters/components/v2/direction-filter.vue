<template>
  <wt-select
    :clearable="false"
    :options="DirectionOptions"
    :value="model"
    class="direction-filter"
    track-by="value"
    use-value-from-options-by-prop="value"
    @input="model = $event"
  />
</template>

<script lang="ts" setup>
import DirectionOptions from '../../enums/DirectionOptions.enum.js';

const model = defineModel<string>();
</script>

<style lang="scss" scoped>
</style>
