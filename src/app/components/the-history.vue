<template>
  <main class="the-history">
    <app-header />
    <router-view />
  </main>
</template>

<script lang="ts" setup>
import { useRegistryStore } from '../../modules/main/modules/registry/store/new/registry.store';
import AppHeader from './shared/app-header/app-header.vue';

const historyTableStore = useRegistryStore();

// [https://webitel.atlassian.net/browse/WTEL-6468]
// Initialize field value to pass a new value to the loadList method, saved from the main table history
historyTableStore.setupStore();
</script>

<style scoped>
.the-history {
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}
</style>
