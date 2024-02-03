<template>
  <main v-if="hasAccess" class="the-history">
    <app-header/>
    <wt-notifications-bar/>
    <router-view></router-view>
  </main>
  <wt-error-page v-else type="403" @back="goToApplicationHub"></wt-error-page>
</template>

<script>
import { mapGetters } from 'vuex';
import WebitelApplications from '@webitel/ui-sdk/src/enums/WebitelApplications/WebitelApplications.enum';
import AppHeader from './shared/app-header/app-header.vue';

export default {
  name: 'the-history',
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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
