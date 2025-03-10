<template>
  <wt-input
    class="preset-name-field"
    v-model="model"
    :v="props.v"
    :label="t('reusable.name')"
    required
  />
</template>

<script setup lang="ts">
import {Validation} from '@vuelidate/core';
import WtInput from "@webitel/ui-sdk/src/components/wt-input/wt-input.vue";
import {useI18n} from "vue-i18n";

type ModelValue = string;

const model = defineModel<ModelValue>();

type Props = {
  v: Validation;
};

const props = defineProps<Props>();

const { t } = useI18n();

</script>

<style scoped lang="scss">
.preset-name-field {

}
</style>
