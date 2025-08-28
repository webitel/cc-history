<template>
  <main
    v-if="hasAccess"
    class="the-history"
  >
    <app-header />
    <wt-notifications-bar />
    <router-view />
  </main>
  <wt-error-page
    v-else
    type="403"
    @back="goToApplicationHub"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { WtApplication } from '@webitel/ui-sdk/enums';

import AppHeader from './shared/app-header/app-header.vue';
import { useRegistryStore } from '../../modules/main/modules/registry/store/new/registry.store';

const store = useStore();

const checkAppAccess = computed(() => store.getters['userinfo/CHECK_APP_ACCESS']);

const hasAccess = computed(() => {
  return checkAppAccess.value(WtApplication.History);
});

const historyTableStore = useRegistryStore();

// [https://webitel.atlassian.net/browse/WTEL-6468]
// Initialize field value to pass a new value to the loadList method, saved from the main table history
historyTableStore.setupStore();

function goToApplicationHub() {
  const adminUrl = import.meta.env.VITE_APPLICATION_HUB_URL;
  window.location.href = adminUrl;
}
</script>

<style lang="scss" scoped>
.the-history {
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}
</style>
