<template>
  <wt-popup
    v-bind="$attrs"
    size="sm"
    @close="emit('close')"
  >
    <template #title>
      {{ $t('filters.preset.presetName') }}
    </template>
    <template #main>
      <wt-input
        v-model="newName"
        :v="v$.newName"
        :label="$t('reusable.name')"
      />
    </template>
    <template #actions>
      <wt-button
        :loading="isLoading"
        :disabled="v$.$error"
        @click="save"
      >
        {{ $t('reusable.save') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="emit('close')"
      >
        {{ $t('reusable.cancel') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { onMounted, ref } from 'vue';

const props = defineProps({
  callback: {
    type: Function,
  },
  name: {
    type: String,
  },
});

const emit = defineEmits([
  'close',
]);

const newName = ref(props.name || '');
const isLoading = ref(false);

const v$ = useVuelidate({
  newName: { required },
}, { newName }, { $autoDirty: true });

async function save() {
  isLoading.value = true;
  try {
    await props.callback({ name: newName.value });
  } finally {
    isLoading.value = false;
  }
  emit('close');
}

onMounted(() => v$.value.$touch());
</script>

<style lang="scss" scoped>

</style>
