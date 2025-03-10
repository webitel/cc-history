<template>
  <div
    v-if="props.previewMode && model"
  >
    <wt-label>
      {{ t('reusable.description') }}
    </wt-label>
    <p>
      {{ model }}
    </p>
  </div>

  <wt-textarea
    v-if="!props.previewMode"
    :value="model"
    :label="t('reusable.description')"
    @input="model = $event"
  />
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";

type ModelValue = string;

const model = defineModel<ModelValue>();

type Props = {
  previewMode: boolean;
};

const props = defineProps<Props>();

const { t } = useI18n();
</script>

<style scoped lang="scss">
.preset-description-field {

}
</style>
