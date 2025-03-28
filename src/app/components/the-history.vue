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

<script>
import WebitelApplications from '@webitel/ui-sdk/src/enums/WebitelApplications/WebitelApplications.enum';
import { mapGetters } from 'vuex';

import AppHeader from './shared/app-header/app-header.vue';

export default {
  name: 'TheHistory',
  components: {
    AppHeader,
  },

  computed: {
    ...mapGetters('userinfo', {
      checkAppAccess: 'CHECK_APP_ACCESS',
    }),
    hasAccess() {
      return this.checkAppAccess(WebitelApplications.HISTORY);
    },
  },

  methods: {
    goToApplicationHub() {
      const adminUrl = import.meta.env.VITE_APPLICATION_HUB_URL;
      window.location.href = adminUrl;
    },
  },
};
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
