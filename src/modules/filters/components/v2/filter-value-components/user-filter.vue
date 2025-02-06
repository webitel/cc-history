<template>
  <wt-select
    :close-on-select="false"
    :search-method="UsersAPI.getLookup"
    :value="model"
    :v="v$.model"
    multiple
    use-value-from-options-by-prop="id"
    @input="handleInput"
  />
</template>

<script lang="ts" setup>
import UsersAPI from '@webitel/ui-sdk/src/api/clients/users/users.js';
import WtSelect from '@webitel/ui-sdk/src/components/wt-select/wt-select.vue';
import {useVuelidate} from "@vuelidate/core";
import { required } from '@vuelidate/validators';
import {computed, watch} from "vue";

type ModelValue = number[];
const model = defineModel<ModelValue>();

const emit = defineEmits<{
  'update:invalid': [boolean]
}>();

const v$ = useVuelidate(
  computed(() => ({
    model: {
      required,
    },
  })),
  { model },
  { $autoDirty: true },
);
v$.value.$touch()

watch(() => v$.value.$invalid, (invalid) => {
  emit('update:invalid', invalid);
}, { immediate: true });

const handleInput = (value: ModelValue) => {
  model.value = value;
};
</script>

<style lang="scss" scoped>
.user-filter {

}
</style>
